import { Request, Response, NextFunction } from 'express'
import * as yup from 'yup'

export const postCreateValidate = async (req: Request, res: Response, next: NextFunction) => {
    const { body } = req
    const objectValidate = yup.object({
        title: yup.string().required(),
        content: yup.string().required()
    })

    try {
        await objectValidate.validate(body)
        next()
    } catch(e: any) {
        res.status(404).json({
            error: {
                message: e.message
            }
        })
    }
}