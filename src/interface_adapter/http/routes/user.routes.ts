import { AwilixContainer } from "awilix"
import { Router } from "express"
import { UserController } from "../controllers/user.controller"
import { authenticationHandler } from "../middlewares/authentication"

export default (container: AwilixContainer): Router =>{
    const router = Router()

    const userController = container.resolve<UserController>('userController')

    router.use(authenticationHandler)

    router.post('/createTask', userController.createTask)
    router.get('/tasks', userController.getTasks)
    router.put('/tasks/:id', userController.updateTask)
    router.delete('/tasks/:id', userController.deleteTask)

    return router;
}