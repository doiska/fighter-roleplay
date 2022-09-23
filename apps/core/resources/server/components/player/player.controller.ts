import { Controller, ClientEvent, ServerEvent } from "@fighter/framework/decorators";
import { Export } from "@fighter/framework/decorators/exports.decorator";
import { EventEmitter } from "@fighter/framework/services";

import { PlayerService } from "@components/player/player.service";

import { AccountEvents } from "@events/account";
import { LoginEvents } from "@events/login";
import { PlayerEvents } from "@events/player";
import { IAccount } from "@typings/authentication/account.model";

@Controller()
export class PlayerController {
	private playerService: PlayerService;
	private emitter: EventEmitter;

	constructor(_emitter: EventEmitter, playerService: PlayerService) {
		this.emitter = _emitter;
		this.playerService = playerService;
		console.log("->> PlayerController initialized");
	}

	@ServerEvent(AccountEvents.ACCOUNT_LOADED)
	public async onAccountLoaded(source: number, account: IAccount) {
		console.log(`->> [onAccountLoaded] Player ${source} loaded account:`, account);
	}

	@ClientEvent(PlayerEvents.PLAYER_LOADED)
	public async onPlayerLoaded(source: number) {

		const _source = global.source;

		console.log(`->> [onPlayerLoaded] Player ${source} ${_source} loaded, showing character screen.`);
		return this.emitter.emitNet(LoginEvents.SHOW_CHARACTERS_SCREEN, source);
	}

	@Export("getPlayers")
	public getPlayers() {
		console.log("->> [getPlayers] Called");
		return this.playerService.getPlayers();
	}
}
