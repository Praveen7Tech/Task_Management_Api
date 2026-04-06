import dotenv from "dotenv"
import connectDB from "./infrastructure/config/db.config"
import http from "http"
import app from "./interface_adapter/express/app"
import container from "./infrastructure/di/container"
import authRouterFactory from "./interface_adapter/http/routes/auth.routes"
import userRouterFactory from "./interface_adapter/http/routes/user.routes"
import { errorHandlerMiddleware } from "./interface_adapter/http/middlewares/error.handler"
dotenv.config()

const PORT = process.env.PORT

async function StartServer(){
    try {
        await connectDB()

        const HttpServer= http.createServer(app)

        const authRouter = authRouterFactory(container)
        const userRouter = userRouterFactory(container)

        app.use('/api/auth', authRouter)
        app.use('/api/user', userRouter)

        app.use(errorHandlerMiddleware)

        HttpServer.listen(PORT, ()=> console.log(`Server running on : http://localhost:${PORT}`))
    } catch (error) {
        console.error("Error in start Server!", error)
    }
}

StartServer()

