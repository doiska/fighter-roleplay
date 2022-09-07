import { XiaoApplication } from "@fighter/framework";
import { Xiao } from "@fighter/framework/decorators";

import { SpawnListener } from "../listeners/spawn";


@Xiao({ controllers: [SpawnListener], providers: [] })
export class Client {}
