import { Request, Response, NextFunction } from 'express'
import * as yup from 'yup'

export const authValidator = async (req: Request, res: Response, next: NextFunction) => {
    const { body } = req
    const objectValidator = yup.object({
        email: yup.string().email().required(),
        password: yup.string().required()
    })

    try {
        await objectValidator.validate(body)
        return next()
    } catch (e: any) {
        return res.status(400).json({
            error: e.errors
        })
    }
}