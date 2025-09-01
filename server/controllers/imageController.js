import fs from 'fs'
import axios from 'axios'
import formData from 'form-data'
import userModel from '../models/userModel.js'

const removeBgImage=async(req,res)=>{
    try {
        const {clerkid}=req.user;
        
        const user=await userModel.findOne({clerkid});
        if(!user) {
            return res.status(404).json({
                success:false,
                message:"Please login!"
            })
        }

        if(user.creditBalance===0) {
            return res.json({
                success:false,
                message:'0 Credit Balance. Buy credit for continue uses',
                creditBalance:user.creditBalance
            })
        }

        // perform bg removal
        const imagePath=req.file.path;

        const imageFile=fs.createReadStream(imagePath);

        const formdata=new formData()
        formdata.append('image_file',imageFile);

        const {data} = await axios.post("https://clipdrop-api.co/remove-background/v1",formdata,{
            headers:{
                "x-api-key":process.env.CLIPDROP_BG_REMOVEL_API_KEY
            },
            responseType:'arraybuffer'
        });
        
        const base64Img=Buffer.from(data,'binary').toString('base64')
        const resultImg=`data:${req.file.mimetype};base64,${base64Img}`

        await userModel.findOneAndUpdate({clerkid:clerkid},{creditBalance:user.creditBalance-1})

        res.status(200).json({
            success:true,
            resultImg,
            creditBalance:user.creditBalance-1,
            message:'Background removed successfully'
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            message:error.message || "Internal server error"
        })
    }
}

export {removeBgImage}