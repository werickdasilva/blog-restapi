import { Request } from "express";

export const extractTokenFromHeader = (req: Request): string | undefined => {
    const { authorization } = req.headers
    if (!authorization) return undefined

    const [type, token] = authorization.split(' ')

    return type === 'Bearer' ? token : undefined 
}