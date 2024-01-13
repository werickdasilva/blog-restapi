import { Request, Response } from 'express'
import { db } from '../db'

export const create = async (req: Request, res: Response) => {
    const { title, content } = req.body
    const id = Number(req.user_id)

    try {
        await db.post.create({
            data: {
                title,
                content,
                user_id: id
            }
        })
        return res.status(200).json({
            message: 'Post creat success'
        })
    } catch (e: any) {
        return res.status(404).json({
            error: {
                message: e.message
            }
        })
    }
}

export const index = async (req: Request, res: Response) => {
    const { id } = req.params

    const post = await db.post.findUnique({
        where: { id: Number(id) },
        include: {
            user: {
                select: {
                    id: true,
                    name: true,
                    photo_profile: true
                }
            }
        }
    })
    
    if (!post) {
        return res.status(404).json({
            error: {
                message: 'Post not found'
            }
        })
    }

    return res.status(200).json({
        data: post
    })
}