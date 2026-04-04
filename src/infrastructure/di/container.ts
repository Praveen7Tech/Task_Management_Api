import { createContainer, InjectionMode } from "awilix";
import { authModule } from "./modules/auth.module";

const container = createContainer({injectionMode: InjectionMode.CLASSIC})

container.register(authModule)

export default container