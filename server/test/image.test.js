import { expect } from "chai";
import sinon from "sinon";
import fs from "fs";
import axios from "axios";
import userModel from "../models/userModel.js";
import { removeBgImage } from "../controllers/imageController.js";

describe("Unit Test: Image Controller", () => {
  let req, res, jsonSpy, statusStub;

  beforeEach(() => {
    req = {
      user: { clerkid: "test_user" },
      file: { path: "dummy/path/img.png", mimetype: "image/png" },
    };
    jsonSpy = sinon.spy();
    statusStub = sinon.stub().returns({ json: jsonSpy });
    res = { status: statusStub, json: jsonSpy };
  });

  afterEach(() => {
    sinon.restore();
  });

  it("should fail if user is not found", async () => {
    sinon.stub(userModel, "findOne").resolves(null);

    await removeBgImage(req, res);

    expect(statusStub.calledWith(404)).to.be.true;
    expect(
      jsonSpy.calledWithMatch({ success: false, message: "Please login!" })
    ).to.be.true;
  });

  it("should fail if user credit balance is 0", async () => {
    sinon.stub(userModel, "findOne").resolves({
      clerkid: "test_user",
      creditBalance: 0,
    });

    await removeBgImage(req, res);

    expect(
      jsonSpy.calledWithMatch({
        success: false,
        message: "0 Credit Balance. Buy credit for continue uses",
      })
    ).to.be.true;
  });

  it("should proceed and deduct credit if user has credits", async () => {
    const mockUser = { clerkid: "test_user", creditBalance: 5 };
    sinon.stub(userModel, "findOne").resolves(mockUser);

    sinon.stub(fs, "createReadStream").returns("fake_stream");
    sinon
      .stub(axios, "post")
      .resolves({ data: Buffer.from("fake_image_data") });

    const updateStub = sinon.stub(userModel, "findOneAndUpdate").resolves({});

    await removeBgImage(req, res);

    expect(statusStub.calledWith(200)).to.be.true;
    expect(jsonSpy.calledWithMatch({ success: true })).to.be.true;

    expect(
      updateStub.calledWith(
        { clerkid: "test_user" },
        { creditBalance: 4 } // 5 - 1 = 4
      )
    ).to.be.true;
  });
});
