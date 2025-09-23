import { Svix, Webhook } from "svix"
import userModel from "../models/userModel.js"
import {Cashfree,CFEnvironment} from 'cashfree-pg'
const backendURL="https://pixelera.vercel.app"

const clerkWebhooks=async (req,res) => {
    try {
        const whook = new Webhook(process.env.CLERK_WEBHOOK_SIGNING_SECRET)
        await whook.verify(JSON.stringify(req.body),{
            "svix-id":req.headers["svix-id"],
            "svix-timestamp":req.headers["svix-timestamp"],
            "svix-signature":req.headers["svix-signature"]
        })

        const {data,type} = req.body

        switch (type) {
            case 'user.created':{
                const userData={
                    clerkid:data.id,
                    email:data.email_addresses[0].email_address,
                    profile_pic:data.image_url,
                    firstName:data.first_name,
                    lastName:data.last_name,
                }
                await userModel.findOneAndUpdate(
                    { clerkid: data.id },
                    userData,
                    { upsert: true, new: true }
                  );                  
                res.json({})
                break;
            }
            case 'user.updated':{
                const userData={
                    email:data.email_addresses[0].email_address,
                    profile_pic:data.image_url,
                    firstName:data.first_name,
                    lastName:data.last_name,
                }
                await userModel.findOneAndUpdate({clerkid:data.id},userData)
                res.json({})
                break;
            }
            case 'user.deleted':{
                await userModel.findOneAndDelete({clerkid:data.id})
                res.json({})
                break;
            }
            default:
                break;
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            message:error.message || "Internal server error"
        })
    }
}

const userCredits=async (req,res) => {
    try {
        const {clerkid}=req.user
        const userData=await userModel.findOne({clerkid})
        
        res.status(200).json({success:true,credits:userData.creditBalance})

    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            success:false,
            message:error.message || "Internal server error"
        })
    }
}

const cashfreeInstance=new Cashfree(
    CFEnvironment.SANDBOX,
    process.env.CASHFREE_APP_ID,
    process.env.CASHFREE_SECRET_KEY
)

const createOrder = async (req,res) => {
    try {
        const {clerkid}=req.user;
        const order={
            order_id:`orderId-${clerkid}_${Date.now()}`,
            order_amount: "1",
            order_currency: "INR",
            customer_details: {
                customer_id: "node_sdk_test",
                customer_name: "Test User",
                customer_email: "example@gmail.com",
                customer_phone: "9999999999",
            },
            order_meta:{
                "notify_url": `${backendURL}/api/user/cf_notify`,
            }
        }

        const orderReceipt = await cashfreeInstance.PGCreateOrder(order);
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

        cashfreeInstance.PGVerifyWebhookSignature(
            req.headers["x-webhook-signature"], 
            req.rawBody, 
            req.headers["x-webhook-timestamp"]
        );
        console.log("webhook verified");
    } catch (error) {
        console.log("Error Verifying: ",error.message);
        res.status(500).json({});
    }
}
export {clerkWebhooks,userCredits,createOrder,cashfreeWebhook};