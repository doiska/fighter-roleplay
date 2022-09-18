
import { Xiao } from "@fighter/framework/decorators";

import { AccountController } from "@components/account/account.controller";
import { AccountService } from "@components/account/account.service";
import { PlayerController } from "@components/player/player.controller";
import { PlayerService } from "@components/player/player.service";
 
@Xiao({
	controllers: [AccountController, PlayerController],
	providers: [AccountService, PlayerService]
})
export class XiaoApp {}
