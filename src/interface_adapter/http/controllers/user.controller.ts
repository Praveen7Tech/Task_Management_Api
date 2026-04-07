import { NextFunction, Request, Response } from "express";
import { ICreateTaskUseCase } from "../../../application/interfaces/usecase/user/createTask.usecase.interface";
import { StatusCode } from "../../../common/constants/status.enum";
import { MESSAGES } from "../../../common/constants/message";
import { IGetTasksUseCase } from "../../../application/interfaces/usecase/user/getTasks.usecase.interface";
import { IUpdateTaskUseCase } from "../../../application/interfaces/usecase/user/updateTask.usecase.interface";
import { IDeleteTaskUseCase } from "../../../application/interfaces/usecase/user/deleteTask.usecase.interface";

export class UserController{
    constructor(
        private readonly _createTaskUsecase: ICreateTaskUseCase,
        private readonly _getTasksUsecase: IGetTasksUseCase,
        private readonly _updateTaskUseCase: IUpdateTaskUseCase,
        private readonly _deleteTaskUseCase: IDeleteTaskUseCase
    ){}

    createTask = async(req:Request, res: Response, next: NextFunction)=>{
        try {
            const id = req.user?.id
            const data = req.body
            if(!id || !data){
                return res.status(StatusCode.BAD_REQUEST).json({message: MESSAGES.UNAUTHORIZED})
            }
            
            const result = await this._createTaskUsecase.execute(id,data)

            return res.status(StatusCode.CREATED).json({task:result, message: "Task created successfully."})
        } catch (error) {
            next(error)
        }
    }

    getTasks = async(req: Request, res: Response, next: NextFunction)=>{
        try {
            const id = req.user?.id
            const page = Number(req.query.page) 
            const limit =  Number(req.query.limit) 
             if(!id || !page || !limit){
                return res.status(StatusCode.UNAUTHORIZED).json({message: MESSAGES.UNAUTHORIZED})
            }
            
            const result = await this._getTasksUsecase.execute(page, limit)

            return res.status(StatusCode.CREATED).json(result)
        } catch (error) {
            next(error)
        }
    }

     updateTask = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const taskId = req.params.id as string;
            const userId = req.user!.id; 
            const updateData = req.body; 

            const task = await this._updateTaskUseCase.execute(taskId, userId, updateData);

            return res.status(StatusCode.CREATED).json({ message: "Task Updated Successfully."});
        } catch (error) {
            next(error);
        }
    };

    deleteTask = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const taskId = req.params.id as string
            const userId = req.user!.id;

            await this._deleteTaskUseCase.execute(taskId, userId);

            return res.status(StatusCode.OK).json({message: "Task deleted successfully" });
        } catch (error) {
            next(error);
        }
    };
}