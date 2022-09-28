import { Controller, ServerEvent } from "@fighter/framework/decorators";
import { EventEmitter } from "@fighter/framework/services";

import { LoginEvents } from "@events/login";

@Controller()
export class CharacterScreenController {
	constructor(private readonly emitter: EventEmitter) {
		console.log("PlayerController created");
	}

	@ServerEvent(LoginEvents.SHOW_CHARACTERS_SCREEN)
	public async onShowCharactersScreen(_source: number, ...args: any[]) {
		console.log(`Player ${_source} requested character screen`, args);
	}

	@ServerEvent(LoginEvents.SELECT_CHARACTER)
	public onSelectCharacter(source: number, characterId: number) {
		console.log(`Player ${source} selected character ${characterId}`);
	}
}
