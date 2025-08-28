import mongoose from "mongoose";

const connectDB = async () => {
  mongoose.connection.on('connected',()=>{
    console.log('mongoDB connected');
  });
  await mongoose.connect(`${process.env.MONGODB_URL}/project 0`);
};

export default connectDB;
