import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
    order_id:{type:String,required:true,unique:true},
    paymentId:{type:String,required:true,unique:true},
    
    order_amount:{type:Number,required:true},
    
    plan_type:{type:String,required:true},
    credits:{type:Number,required:true},

    customer_id:{type:String,required:true},
    event_time:{type:String,required:true},
    payment_status:{type:String,required:true},
    type:{type:String}
})
const transactionModel = mongoose.models.transactions || mongoose.model('transactions',transactionSchema)
export default transactionModel;