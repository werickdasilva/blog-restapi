import { Request, Response } from 'express'
import { db } from '../db'
import * as jwt from 'jsonwebtoken'
import { JWT_EXPIRES_IN, JWT_SECRET } from '../constants'
import { comparePassword } from '../utils/hash.util'

export class AuthController {
    async login(req: Request, res: Response) {
        const { email, password } = req.body
        const user = await db.user.findUnique({ where: { email }})

        if (!user ) {
            return res.status(400).json({
                error: {
                    message: 'Email or Password is wrong'
                }
            })
        }
        
        if (!await comparePassword(password, user.password)) {
            return res.status(400).json({
                error: {
                    message: 'Email or Password bad'
                }
            })
        }
        
        const payload = { user_id: user.id }
        const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN})

        return res.status(200).json({
            acess_token: token
        })
    }
}