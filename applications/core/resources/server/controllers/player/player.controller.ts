import { Controller, LocalEvent } from "@fighter/framework/decorators";
import { EventEmitter } from "@fighter/framework/services";

import { PlayerDB } from "@controllers/player/player.db";
import { PlayerService } from "@controllers/player/player.service";

import { getParsedIdentifiers } from "@helpers/account.helper";

@Controller()
export class PlayerController {
	private playerDB: PlayerDB;
	private playerService: PlayerService;
	private emitter: EventEmitter;

	constructor(_emitter: EventEmitter, playerService: PlayerService) {
		this.emitter = _emitter;
		this.playerService = playerService;
		this.playerDB = new PlayerDB();
	}

	@LocalEvent("playerJoined")
	public onPlayerConnecting(_eventName: string, source: string) {
		console.log("onPlayerConnecting", source);
		const identifiers = getParsedIdentifiers(source);

		this.playerDB.getCharacterByIdentifier(identifiers.steam).then((character) => {
			if (character) {
				console.log("character", character);
				this.playerService.addPlayer({ source, ...character });
			} else {
				console.log("character not found");
			}
		});
	}
}
