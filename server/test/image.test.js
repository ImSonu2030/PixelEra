import { expect } from 'chai';
import sinon from 'sinon';
import fs from 'fs';
import axios from 'axios';
import userModel from '../models/userModel.js';
import { removeBgImage } from '../controllers/imageController.js';
import FormData from 'form-data';

describe('Unit Test: Image Controller', () => {
  let req, res, jsonSpy, statusStub, appendSpy;
  let originalEnvKey;

  beforeEach(() => {
    req = {
      user: { clerkid: 'test_user' },
      file: { path: 'dummy/path/img.png', mimetype: 'image/png' }
    };
    jsonSpy = sinon.spy();
    statusStub = sinon.stub().returns({ json: jsonSpy });
    res = { status: statusStub, json: jsonSpy };
    
    originalEnvKey = process.env.CLIPDROP_BG_REMOVEL_API_KEY;
    process.env.CLIPDROP_BG_REMOVEL_API_KEY = 'test_api_key';

    appendSpy = sinon.spy(FormData.prototype, 'append');
  });

  afterEach(() => {
    sinon.restore();
    process.env.CLIPDROP_BG_REMOVEL_API_KEY = originalEnvKey; 
  });

  it('should fail if user is not found', async () => {
    sinon.stub(userModel, 'findOne').resolves(null);
    await removeBgImage(req, res);
    expect(statusStub.calledWith(404)).to.be.true;
    expect(jsonSpy.calledWithMatch({ success: false })).to.be.true;
  });

  it('should fail if user credit balance is 0', async () => {
    sinon.stub(userModel, 'findOne').resolves({ clerkid: 'test_user', creditBalance: 0 });
    await removeBgImage(req, res);
    expect(jsonSpy.calledWithMatch({ message: '0 Credit Balance. Buy credit for continue uses' })).to.be.true;
  });

  it('should proceed and deduct credit if user has credits', async () => {
    const mockUser = { clerkid: 'test_user', creditBalance: 5 };
    sinon.stub(userModel, 'findOne').resolves(mockUser);
    sinon.stub(fs, 'createReadStream').returns('fake_stream');
    
    const axiosStub = sinon.stub(axios, 'post').resolves({ 
        data: Buffer.from('AAA') 
    });
    
    const updateStub = sinon.stub(userModel, 'findOneAndUpdate').resolves({});

    await removeBgImage(req, res);

    expect(appendSpy.calledWith('image_file', 'fake_stream')).to.be.true;

    expect(axiosStub.calledWith(
        "https://clipdrop-api.co/remove-background/v1", 
        sinon.match.any, 
        sinon.match({
            headers: sinon.match({ "x-api-key": "test_api_key" }),
            responseType: 'arraybuffer'
        })
    )).to.be.true;

    expect(updateStub.calledWith(
        { clerkid: 'test_user' }, 
        { creditBalance: 4 } 
    )).to.be.true;

    expect(jsonSpy.calledWithMatch({ 
        success: true,
        resultImg: 'data:image/png;base64,QUFB', 
        creditBalance: 4
    })).to.be.true;
  });
});