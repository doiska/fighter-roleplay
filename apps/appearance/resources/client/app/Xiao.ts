import { Xiao } from "@fighter/framework/decorators";

import { CustomizationController } from "~/controllers/customization.controller";

@Xiao({ controllers: [CustomizationController], providers: [] })
export class Client {}

