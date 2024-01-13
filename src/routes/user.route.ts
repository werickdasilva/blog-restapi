import { Router } from 'express'
import { UserController } from '../controllers/user.controller'
import { userAuth, userCreate, userUpdate } from '../middlewares/user.middleware'

const userRouter = Router()
const userController = new UserController()

userRouter.get('/:id', userController.index)
userRouter.route('/')
    .post(userCreate, userController.create)
    .put(userAuth, userUpdate, userController.update)

export { userRouter }