import { Router } from 'express'
import * as postController from '../controllers/post.controller'
import { postCreateValidate } from '../middlewares/post.middleware'
import { userAuth } from '../middlewares/user.middleware'

const postRouter = Router()

postRouter.post('/', userAuth, postCreateValidate, postController.create)
postRouter.route('/:id')
    .get(postController.index)
    .put(userAuth, postController.update)

export { postRouter }