import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"

const CLIENT_URL = process.env.NODE_ENV === "development" ? process.env.CLIENT_URL : process.env.CLIENT_URL_PROD
console.log("frontend url : ", CLIENT_URL)

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors({
    origin:[CLIENT_URL!],
    credentials: true,
    methods:['GET','POST','PUT','PATCH','DELETE','OPTIONS']
}))

app.use(cookieParser())

export default app