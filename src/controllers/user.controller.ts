import { Request, Response } from 'express'
import { db } from '../db'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import { hashPassword } from '../utils/hash.util'

export class UserController {
    async index(req: Request, res: Response) {
        const { id } = req.params
        const user = await db.user.findUnique({
            where: {
                id: Number(id)
            },
            select: {
                id: true,
                name: true,
                email: true,
                photo_profile: true,
                create_at: true,
            }
        })

        if (!user) {
            return res.status(404).json({
                message: 'User not exist'
            })
        }

        return res.status(200).json({
            user
        })

    }

    async create(req: Request, res: Response) {
        const { name, email, password } = req.body
        const hash = await hashPassword(password);
        
        try {
            await db.user.create({
                data: {
                    name,
                    email,
                    password: hash
                }
            })

            res.status(200).json({
                message: 'User creat  sucess'
            })
        } catch (e: any) {
            if (e.code === 'P2002') {
                return res.status(400).json({
                    error: {
                        message: 'Email exist'
                    }
                })
            }

            return res.status(400).json({
                error: e
            })
        }

    }

    async update(req: Request, res: Response) {
        const {body: { name, email, password } } = req
        const id = Number(req.user_id)

        try {
            if (!!email) {
                const isEmailExit = await db.user.findUnique({ where: { email }});
                
                if (isEmailExit && isEmailExit.id != id) {
                    return res.status(404).json({
                        error: {
                            message: 'Email is already registered in the system'
                        }
                    })
                }
            }

            let hash: string | undefined
            if (!!password) {
                hash = await hashPassword(password)
            }

            await db.user.update({
                where: {id: id},
                data: {
                    name,
                    email,
                    password: hash
                }
            })
            
            return res.status(200).json({
                message: 'Update Success'
            })
        } catch(e: any) {
            res.status(500).json({
                error: e.message
            })
        }
    }
}