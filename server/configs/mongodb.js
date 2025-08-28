import mongoose from "mongoose";

const connectDB = async () => {
  mongoose.connection.on('connected',()=>{
    console.log('mongoDB connected');
  });
  await mongoose.connect(`${process.env.MONGODB_URL}/pixelera`);
};

export default connectDB;
