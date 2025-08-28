import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import connectDB from './configs/mongodb.js';
import userRouter from './routes/userRoutes.js';

const PORT = process.env.PORT || 4000;
const app=express();

// Intialize Middlerwares
app.use(cors());
app.use(express.json());
await connectDB();

// API routes
app.get('/',(req,res)=>res.send("API Working"))
app.use('/api/user',userRouter)

app.listen(PORT,()=>console.log('server working at port '+PORT))
