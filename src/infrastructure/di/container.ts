import { createContainer, InjectionMode } from "awilix";
import { authModule } from "./modules/auth.module";
import { userModule } from "./modules/user.module";

const container = createContainer({injectionMode: InjectionMode.CLASSIC})

container.register(authModule)
container.register(userModule)

export default container