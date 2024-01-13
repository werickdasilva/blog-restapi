import { NextFunction, Request, Response } from 'express'

export const notFound = (req: Request, res: Response, next: NextFunction) => {
    const error = new Error('Not found')
    res.status(404)

    next(error)
}
