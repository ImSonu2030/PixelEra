import { Svix, Webhook } from "svix"
import userModel from "../models/userModel.js"

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
                await userModel.create(userData)
                res.JSON({})
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
                res.JSON({})
                break;
            }
            case 'user.deleted':{
                await userModel.findOneAndDelete({clerkid:data.id})
                res.JSON({})
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

export {clerkWebhooks}