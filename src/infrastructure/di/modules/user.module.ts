import { asClass } from "awilix";
import { UserController } from "../../../interface_adapter/http/controllers/user.controller";
import { CreateTaskUseCase } from "../../../usecases/user/createTask.UseCase";
import { TaskRepository } from "../../repositories/task.repository";
import { GetTasksUseCase } from "../../../usecases/user/getTasks.UseCase";
import { UpdateTaskUseCase } from "../../../usecases/user/updateTask.UseCase";
import { DeleteUseCase } from "../../../usecases/user/deleteTask.UseCase";
import { SocketNotificationService } from "../../services/socket.notification.service";

export const userModule = {

    _taskRepository: asClass(TaskRepository).scoped(),
    _notificationService: asClass(SocketNotificationService).singleton(),

    _createTaskUsecase: asClass(CreateTaskUseCase).scoped(),
    _getTasksUsecase: asClass(GetTasksUseCase).scoped(),
    _updateTaskUseCase: asClass(UpdateTaskUseCase).scoped(),
    _deleteTaskUseCase: asClass(DeleteUseCase).scoped(),

    userController: asClass(UserController).singleton()
}