import {ClientEvent, Controller, ServerEvent} from "@fighter/framework/decorators";
import {EventEmitter} from "@fighter/framework/services";

import {PlayerService} from "@components/player/player.service";

import {AccountEvents} from "@events/account";
import {LoginEvents} from "@events/login";
import {PlayerEvents} from "@events/player";
import {getUserIdentifier} from "@helpers/account.helper";
import {IAccount} from "@typings/authentication/account.model";

@Controller()
export class PlayerEventsController {
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

	/*

	TODO: FIX source position

	[   script:characters] [XIAO | SERVER | EVENT READER] showCharactersScreen event from  with args: 5
	[   script:characters] Player 0 requested character screen [
	[   script:characters]   5
	[   script:characters] ]

	 */

	@ClientEvent(PlayerEvents.PLAYER_LOADED)
	public async onPlayerLoaded(source: number) {

		const identifier = getUserIdentifier(source);
		await this.playerService.loadPlayer(identifier, 1);

		console.log(`->> [onPlayerLoaded] Player ${source} loaded, showing character screen2.`);
		return this.emitter.emit(LoginEvents.SHOW_CHARACTERS_SCREEN, source);
	}
}
