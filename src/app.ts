import express, { NextFunction, Request, Response } from 'express'
import morgan from 'morgan'
import cors from 'cors'
import { PORT } from './constants'
import { notFound } from './errors/notfound'
import { userRouter } from './routes/user.route'
import { authRouter } from './routes/auth.route'
import { postRouter } from './routes/post.route'
import { commentRouter } from './routes/comment.route'

const app = express()

app.use(morgan('dev'))
app.use(express.json())
app.use(cors())

app.use('/api/user', userRouter)
app.use('/api/', authRouter)
app.use('/api/post', postRouter)
app.use('/api/comment', commentRouter)

app.use(notFound)
app.use((error: any, req: Request, res: Response, next: NextFunction) => {
    res.status(error.status || 500)
    res.json({
        error: {
            message: error.message
        }
    })
})

app.listen(PORT, () => console.log(`Server running in port ${PORT} `))