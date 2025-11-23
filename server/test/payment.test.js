import { expect } from 'chai';
import sinon from 'sinon';
import { Cashfree } from 'cashfree-pg';
import { createOrder, cashfreeWebhook } from '../controllers/paymentController.js';
import transactionModel from '../models/transactionModel.js';
import userModel from '../models/userModel.js';

describe('Unit Test: Payment Controller', () => {
    let req, res, jsonSpy, statusStub, createOrderStub, verifySignatureStub;

    beforeEach(() => {
        req = {
            user: { clerkid: 'test_user' },
            body: {
                order_amount: 100,
                order_type: 'basic',
                credits: 10
            },
            headers: {
                "x-webhook-signature": "sig",
                "x-webhook-timestamp": "123"
            },
            rawBody: "raw_data"
        };
        jsonSpy = sinon.spy();
        statusStub = sinon.stub().returns({ json: jsonSpy });
        res = {
            json: jsonSpy,
            status: statusStub
        };

        createOrderStub = sinon.stub(Cashfree.prototype, 'PGCreateOrder').resolves({
            data: { order_id: 'order_123', payment_session_id: 'session_123' }
        });
        
        verifySignatureStub = sinon.stub(Cashfree.prototype, 'PGVerifyWebhookSignature').returns(true);
    });

    afterEach(() => {
        sinon.restore();
    });


    it('should create order with STRICT parameters', async () => {
        await createOrder(req, res);
        
        expect(createOrderStub.calledOnce).to.be.true;
        const args = createOrderStub.firstCall.args[0];
        expect(args.order_currency).to.equal("INR");
        expect(args.customer_details.customer_phone).to.equal("9999999999");
        expect(jsonSpy.calledWithMatch({ order_status: true })).to.be.true;
    });

    it('should process webhook success', async () => {
        req.body = {
            data: {
                order: { order_id: 'ord_1', order_amount: 100, order_tags: { plan_type: 'basic', credits: '10' } },
                payment: { cf_payment_id: 'pay_1', payment_status: 'SUCCESS' },
                customer_details: { customer_id: 'test_user' }
            },
            event_time: '2023-01-01',
            type: 'PAYMENT_SUCCESS_WEBHOOK'
        };

        sinon.stub(transactionModel, 'create').resolves({});
        sinon.stub(userModel, 'findOne').resolves({ clerkid: 'test_user', creditBalance: 5 });
        const updateUserStub = sinon.stub(userModel, 'findOneAndUpdate').resolves({});

        await cashfreeWebhook(req, res);

        expect(updateUserStub.calledWith(
            { clerkid: 'test_user' },
            { creditBalance: 15 }
        )).to.be.true;
    });


    it('should handle errors in createOrder', async () => {
        createOrderStub.rejects(new Error("Cashfree Down"));
        await createOrder(req, res);
        expect(statusStub.calledWith(500)).to.be.true;
        expect(jsonSpy.calledWithMatch({ message: "Cashfree Down" })).to.be.true;
    });

    it('should handle errors in cashfreeWebhook (Signature Verification)', async () => {
        verifySignatureStub.throws(new Error("Invalid Signature"));
        await cashfreeWebhook(req, res);
        expect(statusStub.calledWith(500)).to.be.true;
        expect(jsonSpy.calledWithMatch({ message: "Error processing webhook." })).to.be.true;
    });
    
    it('should handle errors during transaction creation', async () => {
        req.body = {
             data: {
                order: { order_id: 'ord_1', order_amount: 100, order_tags: { plan_type: 'basic', credits: '10' } },
                payment: { cf_payment_id: 'pay_1', payment_status: 'SUCCESS' },
                customer_details: { customer_id: 'test_user' }
            },
            event_time: '2023-01-01',
            type: 'PAYMENT_SUCCESS_WEBHOOK'
        };
        sinon.stub(transactionModel, 'create').rejects(new Error("DB Error"));
        
        await cashfreeWebhook(req, res);
        
        expect(statusStub.calledWith(500)).to.be.true;
    });
});