import { Controller, ServerEvent } from "@fighter/framework/decorators";
import { EventEmitter } from "@fighter/framework/services";

import { LoginEvents } from "@events/login";

@Controller()
export class PlayerController {
	constructor(private readonly emitter: EventEmitter) {
		console.log("PlayerController created");
	}

	@ServerEvent(LoginEvents.SELECT_CHARACTER)
	public onSelectCharacter(source: number, characterId: number) {
		console.log(`Player ${source} selected character ${characterId}`);
	}
}
