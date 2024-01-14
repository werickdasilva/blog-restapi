import { Request, Response } from 'express'
import { db } from '../db'

export const addComment = async (req: Request, res: Response) => {
    const { post_id } = req.params
    const { content } = req.body
    const user_id = req.user_id

    await db.comments.create({
        data: {
            content: content,
            post_id: Number(post_id),
            user_id: Number(user_id)
        }
    })

    return res.status(200).json({
        message: 'Comment create success'
    })
}

export const getAllCommentPost = async (req: Request, res: Response) => {
    const comments = await db.comments.findMany({
        where: {
            post_id: Number(req.params.post_id)
        },
        select: {
            content: true,
            create_at: true,
            user: {
                select: {
                    id: true,
                    name: true,
                    photo_profile: true
                }
            }
        }
    })

    return res.status(200).json({
        comments 
    })
}