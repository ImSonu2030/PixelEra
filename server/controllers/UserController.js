import { Svix, Webhook } from "svix"
import userModel from "../models/userModel.js"
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

export {clerkWebhooks,userCredits};