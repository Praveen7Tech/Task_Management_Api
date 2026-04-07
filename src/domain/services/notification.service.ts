type TaskActivity = 'CREATE' | 'UPDATE' | 'DELETE'

export interface INotificationService{
    broadcastTaskActivity(senderId: string,userName: string, taskName: string, type:TaskActivity): Promise<void>
}