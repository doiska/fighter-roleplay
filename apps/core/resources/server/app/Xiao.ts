
import { Xiao } from "@fighter/framework/decorators";

import { AccountController } from "@components/account/account.controller";
import { AccountService } from "@components/account/account.service";
import { PlayerController } from "@components/player/player.controller";
import {PlayerEventsController} from "@components/player/player.events";
import {PlayerService} from "@components/player/player.service";

@Xiao({
	controllers: [AccountController, PlayerController, PlayerEventsController],
	providers: [AccountService, PlayerService]
})
export class XiaoApp {}
