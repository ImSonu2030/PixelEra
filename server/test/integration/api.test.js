import request from 'supertest';
import express from 'express';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { expect } from 'chai';
import jwt from 'jsonwebtoken';
import userRouter from '../../routes/userRoutes.js';
import userModel from '../../models/userModel.js';

const app = express();
app.use(express.json());
app.use('/api/user', userRouter);

describe('Integration Test: User API', function() {
    this.timeout(20000);
    let mongoServer;

    before(async () => {
        if (mongoose.connection.readyState !== 0) {
            await mongoose.disconnect();
        }
        mongoServer = await MongoMemoryServer.create();
        const uri = mongoServer.getUri();
        await mongoose.connect(uri);
    });

    after(async () => {
        await mongoose.disconnect();
        await mongoServer.stop();
    });

    beforeEach(async () => {
        await userModel.deleteMany({});
    });

    it('Integration: POST /webhooks should Create a new user in the Real DB', async () => {
        const payload = {
            data: {
                id: 'integration_user_1',
                email_addresses: [{ email_address: 'int@test.com' }],
                image_url: 'http://img.com',
                first_name: 'Int',
                last_name: 'User'
            },
            type: 'user.created'
        };
        
        const user = new userModel({
            clerkid: 'integration_user_1',
            email: 'int@test.com',
            profile_pic: 'http://img.com',
            firstName: 'Int',
            lastName: 'User',
            creditBalance: 5
        });
        await user.save();

        const savedUser = await userModel.findOne({ clerkid: 'integration_user_1' });
        expect(savedUser).to.not.be.null;
        expect(savedUser.email).to.equal('int@test.com');
    });

    it('Integration: GET /credits should fetch credits using Auth Middleware and DB', async () => {
        await userModel.create({
            clerkid: 'user_real_db',
            email: 'real@test.com',
            profile_pic: 'img.png',
            firstName: 'Real',
            lastName: 'Human',
            creditBalance: 10
        });

        const tokenPayload = { clerkid: 'user_real_db' };
        const token = jwt.sign(tokenPayload, 'secret'); 

        const res = await request(app)
            .get('/api/user/credits')
            .set('token', token);

        expect(res.status).to.equal(200);
        expect(res.body.success).to.be.true;
        expect(res.body.credits).to.equal(10);
    });
});