
export interface IDeleteTaskUseCase{
    execute(taskId: string, userId: string): Promise<void>
}