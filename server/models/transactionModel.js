import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
    transactionId:{type:Number,required:true,unique:true},
    orderId:{type:Number,required:true,unique:true},
    
    plan:{type:String,required:true},
    amount:{type:Number,required:true},
    credits:{type:Number,required:true},
    customerId:{type:String,required:true},
    checkoutTime:{type:String,required:true},
    paymetStatus:{type:Boolean,default:false},
})
const transactionModel = mongoose.models.transactions || mongoose.model('transactions',transactionSchema)
export default transactionModel;