import express from 'express'
import authUser from '../middlewares/auth.js'
import { cashfreeWebhook, clerkWebhooks, createOrder, userCredits } from '../controllers/UserController.js'

const userRouter = express.Router()

userRouter.post('/webhooks',clerkWebhooks)
userRouter.post('/cf_notify',cashfreeWebhook);
userRouter.get('/credits',authUser,userCredits)
userRouter.post('/create-order',authUser,createOrder)
export default userRouter