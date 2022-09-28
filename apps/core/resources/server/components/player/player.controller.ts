import { Controller} from "@fighter/framework/decorators";
import { Export } from "@fighter/framework/decorators/exports.decorator";
import { EventEmitter } from "@fighter/framework/services";


import {PlayerService} from "@components/player/player.service";

import {getUserIdentifier} from "@helpers/account.helper";
import {ICharacter} from "@typings/authentication/character";

@Controller()
export class PlayerController {
	private playerService: PlayerService;
	private emitter: EventEmitter;

	constructor(_emitter: EventEmitter, playerCache: PlayerService) {
		this.emitter = _emitter;
		this.playerService = playerCache;
		console.log("->> PlayerController initialized");
	}

	@Export("loadPlayer")
	public loadPlayer(source: number, characterId: number) {
		console.log("->> [loadPlayer] Called");
		return this.playerService.loadPlayer(getUserIdentifier(source), characterId);
	}

	@Export("updatePlayer")
	public updatePlayer(source: number, player: Partial<ICharacter>) {
		this.playerService.updatePlayer(source, player);
	}

	@Export("getPlayer")
	public getPlayer(source: number) {
		return this.playerService.getPlayer(source);
	}

	@Export("getPlayerByCharacterId")
	public getPlayerByCharacterId(characterId: number) {
		return this.playerService.getPlayerByCharacterId(characterId);
	}

	@Export("getPlayerByIdentifier")
	public getPlayerByIdentifier(identifier: string) {
		return this.playerService.getPlayerByIdentifier(identifier);
	}

	@Export("getPlayers")
	public getPlayers() {
		console.log("->> [getPlayers] Called");
		return this.playerService.getPlayers();
	}
}
