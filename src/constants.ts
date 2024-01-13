import 'dotenv/config'

const PORT = process.env.PORT!
const JWT_SECRET = process.env.JWT_SECRET!
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN!

export {
    PORT,
    JWT_SECRET,
    JWT_EXPIRES_IN
}