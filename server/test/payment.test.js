import { expect } from 'chai';
import sinon from 'sinon';
import transactionModel from '../models/transactionModel.js';
import userModel from '../models/userModel.js';
import { Cashfree } from 'cashfree-pg';

describe('Integration Test: Payment Controller', () => {
    let req, res, jsonSpy, statusStub;
    let verifyStub, createOrderStub, createStub, findUserStub, updateUserStub;
    let cashfreeWebhook, createOrder; 

    before(async () => {
        verifyStub = sinon.stub(Cashfree.prototype, 'PGVerifyWebhookSignature').returns(true);
        createOrderStub = sinon.stub(Cashfree.prototype, 'PGCreateOrder').resolves({
            data: { order_id: 'new_order_123', payment_session_id: 'session_123' }
        });
        
        const controller = await import('../controllers/paymentController.js');
        cashfreeWebhook = controller.cashfreeWebhook;
        createOrder = controller.createOrder;
    });

    beforeEach(() => {
        req = {
            user: { clerkid: 'test_user' },
            body: {
                order_amount: 100,
                order_type: 'Basic',
                credits: 10,
                data: {
                    order: { order_id: '123', order_amount: 100, order_tags: { plan_type: 'Basic', credits: '10' } },
                    payment: { cf_payment_id: 'pay_123', payment_status: 'SUCCESS' },
                    customer_details: { customer_id: 'test_user' }
                },
                event_time: '2023-01-01',
                type: 'PAYMENT_SUCCESS_WEBHOOK'
            },
            headers: { "x-webhook-signature": "sig", "x-webhook-timestamp": "123" },
            rawBody: "raw_data"
        };
        jsonSpy = sinon.spy();
        statusStub = sinon.stub().returns({ json: jsonSpy });
        res = { status: statusStub, json: jsonSpy };

        createStub = sinon.stub(transactionModel, 'create').resolves({});
        findUserStub = sinon.stub(userModel, 'findOne').resolves({ clerkid: 'test_user', creditBalance: 5 });
        updateUserStub = sinon.stub(userModel, 'findOneAndUpdate').resolves({});
    });

    afterEach(() => {
        createStub.restore();
        findUserStub.restore();
        updateUserStub.restore();
        verifyStub.resetHistory();
        createOrderStub.resetHistory();
    });

    after(() => {
        sinon.restore();
    });

    it('should create an order successfully with exact parameters', async () => {
        await createOrder(req, res);

        expect(createOrderStub.calledWith(sinon.match({
            order_amount: "100",
            order_currency: "INR",
            customer_details: {
                customer_id: 'test_user',
                customer_name: "Test User",
                customer_email: "example@gmail.com",
                customer_phone: "9999999999",
            },
            order_meta: {
                "notify_url": "https://pixelera.vercel.app/api/payment/cf_notify",
            },
            order_tags: {
                "plan_type": "Basic",
                "credits": "10",
                "plan_price": "100"
            }
        }))).to.be.true;

        expect(jsonSpy.calledWithMatch({ order_status: true })).to.be.true;
    });

    it('should handle errors in createOrder', async () => {
        createOrderStub.rejects(new Error("API Error"));
        await createOrder(req, res);
        expect(statusStub.calledWith(500)).to.be.true;
    });

    it('should update user credits if payment status is SUCCESS', async () => {
        await cashfreeWebhook(req, res);
        
        expect(createStub.calledWith(sinon.match({
            order_id: '123',
            payment_status: 'SUCCESS',
            credits: 10
        }))).to.be.true;

        expect(updateUserStub.calledWith(
            { clerkid: 'test_user' },
            { creditBalance: 15 }
        )).to.be.true;
    });

    it('should NOT update user credits if payment status is FAILED', async () => {
        req.body.data.payment.payment_status = "FAILED";
        await cashfreeWebhook(req, res);
        expect(updateUserStub.called).to.be.false;
    });

    it('should handle verification errors', async () => {
        verifyStub.throws(new Error("Invalid Signature"));
        await cashfreeWebhook(req, res);
        expect(statusStub.calledWith(500)).to.be.true;
    });
});