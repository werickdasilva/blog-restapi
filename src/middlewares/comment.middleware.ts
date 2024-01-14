import { Request, Response, NextFunction } from 'express'

export const commentValidate = async (req: Request, res: Response, next: NextFunction) => {
    const { content } = req.body

    if (!content) {
        return res.status(401).json({
            error: {
                message: 'Required content'
            }
        })
    }

    return next()
}