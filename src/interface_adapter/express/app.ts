import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"

const app = express()
console.log("client", process.env.CLIENT_URL)

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())
app.use(cors({
    origin:["http://localhost:5173"],
    credentials: false,
    methods:['GET','POST','PUT','PATCH','DELETE','OPTIONS']
}))

export default app