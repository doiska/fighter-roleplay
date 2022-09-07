
import { Xiao } from "@fighter/framework/decorators";
import { SpawnController } from "@controllers/spawn.controller";

@Xiao({
	controllers: [SpawnController],
	providers: []
})
export class XiaoApp {}
