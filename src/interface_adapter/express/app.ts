import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors({
    origin:["http://localhost:5173"],
    credentials: true,
    methods:['GET','POST','PUT','PATCH','DELETE','OPTIONS']
}))

app.use(cookieParser())

export default app