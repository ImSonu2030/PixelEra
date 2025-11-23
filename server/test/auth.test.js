import { expect } from 'chai';
import sinon from 'sinon';
import jwt from 'jsonwebtoken';
import authUser from '../middlewares/auth.js';

describe('Unit Test: Auth Middleware', () => {
  let req, res, next;

  beforeEach(() => {
    req = { headers: {} };
    res = {
      json: sinon.spy(),
      status: sinon.stub().returnsThis()
    };
    next = sinon.spy();
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should return 404/error if no token is provided', async () => {
    await authUser(req, res, next);
    expect(res.json.calledWithMatch({ success: false, message: 'Not authorizeed login again' })).to.be.true;
    expect(next.called).to.be.false;
  });

  it('should call next() if a valid token is provided', async () => {
    req.headers.token = 'valid_token';
    sinon.stub(jwt, 'decode').returns({ clerkid: 'user_123' });
    await authUser(req, res, next);
    expect(next.called).to.be.true;
    expect(req.user).to.have.property('clerkid', 'user_123');
  });

  it('should handle internal errors', async () => {
    req.headers.token = 'bad_token';
    sinon.stub(jwt, 'decode').throws(new Error("JWT Error"));
    
    await authUser(req, res, next);
    
    expect(res.status.calledWith(500)).to.be.true;
    expect(res.json.calledWithMatch({ message: "JWT Error" })).to.be.true;
  });
});