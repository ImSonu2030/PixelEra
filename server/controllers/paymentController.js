import userModel from "../models/userModel.js"
import {Cashfree,CFEnvironment} from 'cashfree-pg'
const backendURL="https://pixelera.vercel.app"

const cashfreeOrdersInstance=new Cashfree(
    CFEnvironment.SANDBOX,
    process.env.CASHFREE_APP_ID,
    process.env.CASHFREE_SECRET_KEY
)

const createOrder = async (req,res) => {
    try {
        const {clerkid}=req.user;
        const order={
            order_id:`orderId-${clerkid}_${Date.now()}`,
            order_amount: `${req.body.order_amount}`,
            order_currency: "INR",
            customer_details: {
                customer_id: "node_sdk_test",
                customer_name: "Test User",
                customer_email: "example@gmail.com",
                customer_phone: "9999999999",
            },
            order_meta:{
                "notify_url": `${backendURL}/api/payment/cf_notify`,
                user_id:clerkid,
                plan_details:{
                    plan:`${req.body.order_type}`,
                    credit:`${req.body.credits}`,
                    price:`${req.body.order_amount}`,
                }
            }
        }

        const orderReceipt = await cashfreeOrdersInstance.PGCreateOrder(order);
        res.json({
            order_status:true,
            order_id:orderReceipt.data.order_id,
            payment_session_id: orderReceipt.data.payment_session_id,
        })
    } catch (error) {
        console.log("Error creating order: ",error.message);
        res.status(500).json({
            success:false,
            message:error.message || "Internal server error"
        })
    }
}
const cashfreeWebhookInstance=new Cashfree(
    CFEnvironment.SANDBOX,
    process.env.CASHFREE_APP_ID,
    process.env.CASHFREE_SECRET_KEY
)

const cashfreeWebhook = async (req,res) => {
    try {
        console.log("raw body: ");
        console.log(req.rawBody);
        
        cashfreeWebhookInstance.PGVerifyWebhookSignature(
            req.headers["x-webhook-signature"], 
            req.rawBody, 
            req.headers["x-webhook-timestamp"]
        );
        
        console.log("webhook verified");
        console.log(req.body);
        // const {data,event_time,type}=req.body;

        // const paymentDetails={
        //     order_id:data.order.order_id,
        //     paymentId:data.payment.cf_payment_id,
        //     order_amount:data.payment.payment_amount,
        //     order_currency:data.payment.payment_currency,
        //     plan,
        //     creditDeposit,
        //     customer_id,
        //     event_time,
        //     payment_status,
        //     type,
        // }

        res.status(200).json({
            success:true,
            message:"Success!"
        })
    } catch (error) {
        console.log("Error Verifying: ",error.message);
        res.status(500).json({});
    }
}

export {cashfreeWebhook,createOrder};