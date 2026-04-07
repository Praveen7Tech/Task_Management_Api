import { INotificationService } from "../../domain/services/notification.service";
import { getIO } from "../config/socket.io";

export class SocketNotificationService implements INotificationService{

    async broadcastTaskActivity(senderId:string,userName: string, taskName: string, type: "CREATE" | "UPDATE" | "DELETE"): Promise<void> {

        const io = getIO();
        
        io.emit("task_activity",{
            senderId,
            userName,
            taskName,
            type: type.toLocaleLowerCase()
        })
    }
}