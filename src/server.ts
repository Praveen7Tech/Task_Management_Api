import dotenv from "dotenv"
import connectDB from "./infrastructure/config/db.config"
import http from "http"
import app from "./interface_adapter/express/app"
import container from "./infrastructure/di/container"
import authRouterFactory from "./interface_adapter/http/routes/auth.routes"
dotenv.config()

const PORT = process.env.PORT

async function StartServer(){
    try {
        await connectDB()

        const HttpServer= http.createServer(app)

        const authRouter = authRouterFactory(container)

        app.use('/api/auth', authRouter)

        HttpServer.listen(PORT, ()=> console.log(`Server running on : http://localhost:${PORT}`))
    } catch (error) {
        console.error("Error in start Server!", error)
    }
}

StartServer()
console.log("hello world")

