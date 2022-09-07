
import { Xiao } from "@fighter/framework/decorators";

import { AccountController } from "@controllers/account/account.controller";
import { PlayerController } from "@controllers/player/player.controller";
 
@Xiao({
	controllers: [AccountController, PlayerController],
	providers: []
})
export class XiaoApp {}
