import dotenv from "dotenv"
dotenv.config()
import { CookieOptions } from "express";

const IS_PRODUCTION = process.env.NODE_ENV === "production" 
console.log("node env : ", IS_PRODUCTION)

export const COOKIE_OPTIONS : CookieOptions = {
    httpOnly: true,
    sameSite: IS_PRODUCTION ? "strict" : "lax",
    secure: IS_PRODUCTION ? true : false,
    path: "/",
    maxAge: 7*24*60*60*1000,
}