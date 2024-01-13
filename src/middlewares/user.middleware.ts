import { NextFunction, Request, Response } from 'express'
import * as yup from 'yup'
import { extractTokenFromHeader } from '../utils/token.util'
import * as jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../constants'

export const userCreate = async (req: Request, res: Response, next: NextFunction) => {
    const { body } = req
    const validate = yup.object({
        name: yup.string().min(3).required(),
        email: yup.string().email().required(),
        password: yup.string().min(8).required()
    })
    
    try {
        await validate.validate(body)
    } catch(e: any) {
        return res.status(400).json({
            error: e.errors
        })
    }
    next()
}

export const userUpdate = async (req: Request, res: Response, next: NextFunction) => {
    const { body } = req
    const isObjectPropertyDoesNotExist = !body.name && !body.email && !body.password

    if (Object.keys(body).length == 0 || isObjectPropertyDoesNotExist) {
        return res.status(200).json({
            message: 'nothing to update'
        })
    }

    const validate = yup.object({
        name: yup.string().min(3),
        email: yup.string().email(),
        password: yup.string().min(8)
    })

    try {
        await validate.validate(body)
    } catch(e: any) {
        return res.status(400).json({
            error: e.errors
        })
    }
    next()
}

export const userAuth = async (req: Request, res: Response, next: NextFunction) => {
    const token = extractTokenFromHeader(req)

    if (!token) {
        return res.status(401).json({
            error: {
                message: 'Unauthorized'
            }
        })
    }

    try {
        const { user_id } = jwt.verify(token, JWT_SECRET) as {user_id: string}

        req.user_id = user_id
        return next()
    } catch(e: any) {
        return res.status(401).json({
            error: {
                message: e.message
            }
        })
    }
}