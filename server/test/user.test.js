import { expect } from 'chai';
import sinon from 'sinon';
import { Webhook } from 'svix';
import userModel from '../models/userModel.js';
import { clerkWebhooks, userCredits } from '../controllers/UserController.js';

describe('Unit Test: User Controller', () => {
    let req, res, jsonSpy, statusStub;
    let originalEnvSecret, verifyStub;

    before(() => {
        verifyStub = sinon.stub(Webhook.prototype, 'verify');
    });

    beforeEach(() => {
        originalEnvSecret = process.env.CLERK_WEBHOOK_SIGNING_SECRET;
        process.env.CLERK_WEBHOOK_SIGNING_SECRET = 'whsec_' + Buffer.from('test').toString('base64');

        req = { 
            headers: { 'svix-id': '1', 'svix-timestamp': '1', 'svix-signature': '1' },
            body: { 
                data: { 
                    id: 'user_123', 
                    email_addresses: [{ email_address: 'test@test.com' }],
                    image_url: 'http://img.com',
                    first_name: 'Test',
                    last_name: 'User'
                }, 
                type: '' 
            },
            user: { clerkid: 'user_123' }
        };
        jsonSpy = sinon.spy();
        statusStub = sinon.stub().returns({ json: jsonSpy });
        res = { json: jsonSpy, status: statusStub };

        verifyStub.resolves(req.body);
    });

    afterEach(() => {
        sinon.restore();
        verifyStub = sinon.stub(Webhook.prototype, 'verify'); 
        process.env.CLERK_WEBHOOK_SIGNING_SECRET = originalEnvSecret;
    });
    
    after(() => {
        if (verifyStub.restore) verifyStub.restore();
    });

    it('should handle user.created event', async () => {
        req.body.type = 'user.created';
        const updateStub = sinon.stub(userModel, 'findOneAndUpdate').resolves({});
        
        await clerkWebhooks(req, res);

        expect(updateStub.calledWith(
            { clerkid: 'user_123' },
            {
                clerkid: 'user_123',
                email: 'test@test.com',
                profile_pic: 'http://img.com',
                firstName: 'Test',
                lastName: 'User'
            }, 
            { upsert: true, new: true }
        )).to.be.true;
    });

    it('should handle user.updated event', async () => {
        req.body.type = 'user.updated';
        const updateStub = sinon.stub(userModel, 'findOneAndUpdate').resolves({});
        
        await clerkWebhooks(req, res);

        expect(updateStub.calledWith(
            { clerkid: 'user_123' },
            {
                email: 'test@test.com',
                profile_pic: 'http://img.com',
                firstName: 'Test',
                lastName: 'User'
            }
        )).to.be.true;
    });

    it('should handle user.deleted event', async () => {
        req.body.type = 'user.deleted';
        const deleteStub = sinon.stub(userModel, 'findOneAndDelete').resolves({});
        await clerkWebhooks(req, res);
        expect(deleteStub.calledWith({ clerkid: 'user_123' })).to.be.true;
    });

    it('should handle webhook errors', async () => {
        verifyStub.rejects(new Error("Svix Error"));
        await clerkWebhooks(req, res);
        expect(statusStub.calledWith(500)).to.be.true;
    });

    it('should return user credits', async () => {
        sinon.stub(userModel, 'findOne').resolves({ creditBalance: 99 });
        await userCredits(req, res);
        expect(jsonSpy.calledWithMatch({ success: true, credits: 99 })).to.be.true;
    });

    it('should handle errors in userCredits', async () => {
        sinon.stub(userModel, 'findOne').rejects(new Error("DB Error"));
        await userCredits(req, res);
        expect(statusStub.calledWith(500)).to.be.true;
    });
});