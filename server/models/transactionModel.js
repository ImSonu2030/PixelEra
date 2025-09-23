import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
    order_id:{type:String,required:true,unique:true},
    paymentId:{type:String,required:true,unique:true},
    
    order_amount:{type:Number,required:true},
    order_currency:{type:String},
    
    plan:{type:String,required:true},
    creditDeposit:{type:Number,required:true},

    customer_id:{type:String,required:true},
    event_time:{type:String,required:true},
    payment_status:{type:Boolean,required:true},
    type:{type:String}
})
const transactionModel = mongoose.models.transactions || mongoose.model('transactions',transactionSchema)
export default transactionModel;