import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    clerkid:{type:String,required:true,unique:true},
    email:{type:String,required:true,unique:true},
    profile_pic:{type:String,required:true},
    firstName:{type:String},
    lastName:{type:String},
    creditBalance:{type:Number,default:5}
})

const userModel=mongoose.models.user || mongoose.model('user',userSchema)

export default userModel;