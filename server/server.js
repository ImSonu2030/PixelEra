import "dotenv/config";
import express from "express";
import cors from "cors";
import connectDB from "./configs/mongodb.js";
import userRouter from "./routes/userRoutes.js";
import imageRouter from "./routes/imageRoute.js";
import paymentRouter from "./routes/paymentRoute.js";

const PORT = process.env.PORT || 4000;
const app = express();

app.use(cors());
await connectDB();

// Payment APIs
app.use("/api/payment",paymentRouter);

// API routes
app.use(express.json());
app.get("/", (req, res) => res.send("API Working"));
app.use("/api/user", userRouter);
app.use("/api/image",imageRouter);

app.listen(PORT, () => console.log("server working at port " + PORT));