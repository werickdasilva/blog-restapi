import { Router } from 'express'
import { AuthController } from '../controllers/auth.controller'
import { authValidator } from '../middlewares/auth.middleware'

const authRouter = Router()
const authController = new AuthController()

authRouter.post('/login', authValidator, authController.login)

export { authRouter }