import { Xiao } from "@fighter/framework/decorators";
import { XiaoApplication } from "@fighter/framework";
import { SpawnListener } from '../listeners/spawn';


@Xiao({ controllers: [SpawnListener], providers: [] })
export class Client {}
