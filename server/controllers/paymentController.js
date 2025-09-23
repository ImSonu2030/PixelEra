import userModel from "../models/userModel.js"
import {Cashfree,CFEnvironment} from 'cashfree-pg'
import transactionModel from "../models/transactionModel.js"
const backendURL="https://pixelera.vercel.app"

const cashfree=new Cashfree(
    CFEnvironment.SANDBOX,
    process.env.CASHFREE_APP_ID,
    process.env.CASHFREE_SECRET_KEY
)

const createOrder = async (req,res) => {
    try {
        const {clerkid}=req.user;
        const {order_amount,order_type,credits}=req.body;
        
        const order={
            order_id:`orderId-${clerkid}_${Date.now()}`,
            order_amount: `${order_amount}`,
            order_currency: "INR",
            customer_details: {
                customer_id: clerkid,
                customer_name: "Test User",
                customer_email: "example@gmail.com",
                customer_phone: "9999999999",
            },
            order_meta:{
                "notify_url": `${backendURL}/api/payment/cf_notify`,
            },
            order_tags:{
                "plan_type": `${order_type}`,
                "credits": `${credits}`,
                "plan_price": `${order_amount}`
            }
        }

        const orderReceipt = await cashfree.PGCreateOrder(order);
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

const cashfreeWebhook = async (req,res) => {
    try {
        console.log("Raw body: ");
        console.log(req.rawBody);
        
        cashfree.PGVerifyWebhookSignature(
            req.headers["x-webhook-signature"], 
            req.rawBody, 
            req.headers["x-webhook-timestamp"]
        );
        
        console.log("webhook verified");
        const {data,event_time,type}=req.body;
        const transactionDetail = {
            order_id: data.order.order_id,
            paymentId: data.payment.cf_payment_id,
            order_amount: data.order.order_amount,
            plan_type: data.order.order_tags.plan_type,
            credits: parseInt(data.order.order_tags.credits, 10),
            customer_id: data.customer_details.customer_id,
            event_time: event_time,
            payment_status: data.payment.payment_status,
            type: type
        };

        console.log("transactionDetail variable:");
        console.log(transactionDetail);
        
        // Store the transaction detail
        if(transactionDetail.payment_status) {
            await transactionModel.create(transactionDetail);
            const user=await userModel.findOne({clerkid:transactionDetail.customer_id});
            await userModel.findOneAndUpdate({clerkid:user.clerkid},{creditBalance:user.creditBalance+credits});
        }

        res.status(200).json({
            success:true,
            message:"Webhook received successfully!!"
        })
    } catch (error) {
        console.log("Error Verifying: ",error.message);
        res.status(500).json({
            success:false,
            message:"Error processing webhook."
        });
    }
}

export {cashfreeWebhook,createOrder};