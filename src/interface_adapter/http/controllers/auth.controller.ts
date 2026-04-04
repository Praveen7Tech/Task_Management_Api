import { NextFunction, Request, Response } from "express";

export class AuthController{
    constructor(){}

    signup = async(req:Request, res:Response, next:NextFunction)=>{
        try {
            console.log('auth controller')
        } catch (error) {
            console.error(error)
        }
    }
}