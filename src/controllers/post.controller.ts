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

export const update = async (req: Request, res: Response) => {
    const { 
        body: { title, content},
        params: { id },
        user_id
    } = req

    const isPostExist = await db.post.findUnique({ where: { id : +id } })
    if (!isPostExist) {
        return res.status(401).json({
            error: {
                message: 'Post not exist'
            }
        })
    }

    const user = await db.user.findUnique({
        where: {
            id: +user_id
        },
        select: {
            Post: true
        }
    })

    if (!title && !content) {
        return res.status(401).json({
            error: {
                message: 'requires title or content'
            }
        })
    }

    if (!user) {
        return res.status(401).json({
            error: {
                message: 'User invalid on database'
            }
        })
    } 
    for (const post of user?.Post) {
        if (post.id == +id) {
            await db.post.update({
                where: {
                    id: +id
                },
                data: {
                    title,
                    content
                }
            })

            return res.status(200).json({
                data: {
                    message: 'Update success'
                }
            })
        }
    }

    return res.status(400).json({
        error: {
            message: 'you do not have access to this post'
        }
    })
}