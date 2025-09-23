import express from 'express'
import authUser from '../middlewares/auth.js'
import { clerkWebhooks, userCredits } from '../controllers/UserController.js'

const userRouter = express.Router()

userRouter.post('/webhooks',clerkWebhooks);
userRouter.get('/credits',authUser,userCredits);
export default userRouter