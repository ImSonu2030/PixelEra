import express from "express";
import authUser from "../middlewares/auth.js";
import { cashfreeWebhook, createOrder } from "../controllers/paymentController.js";

const paymentRouter = express.Router();

paymentRouter.post('/cf_notify',express.json({
    verify: (req,res,buf) => {
        req.rawBody=buf.toString();
    }
}),cashfreeWebhook);
paymentRouter.post('/create-order',authUser,createOrder);

export default paymentRouter;
