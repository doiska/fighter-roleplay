import { Controller } from "@fighter/framework/decorators";
import { EventEmitter } from "@fighter/framework/services";

import { PlayerService } from "@components/player/player.service";

@Controller()
export class PlayerController {
	private playerService: PlayerService;
	private emitter: EventEmitter;

	constructor(_emitter: EventEmitter, playerService: PlayerService) {
		this.emitter = _emitter;
		this.playerService = playerService;
		console.log("->> PlayerController initialized");
	}
}
