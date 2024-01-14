import { Router } from 'express'
import * as commentController from '../controllers/comment.controller'
import { userAuth } from '../middlewares/user.middleware'
import { commentValidate } from '../middlewares/comment.middleware'

const commentRouter = Router()
commentRouter.post('/:post_id', userAuth, commentValidate, commentController.addComment)
commentRouter.get('/', commentController.getAllCommentPost)
export { commentRouter }