import bcrypt from 'bcrypt'

const saltOrRounds = 10

export const hashPassword = (text: string) => {
    return bcrypt.hash(text, saltOrRounds)
}


export const comparePassword = (password: string, hashPassword: string) => {
    return bcrypt.compare(password, hashPassword)
}