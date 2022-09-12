import { RegisterCommand, Controller, ClientEvent, ServerEvent } from "@fighter/framework/decorators";
import { EventEmitter } from "@fighter/framework/services";

import { PlayerService } from "@components/player/player.service";

import { AccountEvents } from "@events/account";
import { CustomizationEvents } from "@events/customization";
import { PlayerEvents } from "@events/player";
import { TestEvents } from "@events/test";
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
		const accountId = account.id;
		const [identifier] = account.identifiers;

		console.log(`[onAccountLoaded] Account ${accountId} (${identifier}) has been loaded.`);

		this.playerService.addPlayer(source, { accountId, identifier });
	}

	@ClientEvent(PlayerEvents.PLAYER_LOADED)
	public async onPlayerLoaded(source: number) {

		const _source = global.source;

		console.log(`->> [onPlayerLoaded] Player ${source} ${_source} loaded.`);
		return this.emitter.emitNet(CustomizationEvents.SHOW_CUSTOMIZATION, source);
	}

	@ClientEvent(TestEvents.TEST2)
	public async onTest2(...args: any) {
		const _source = globalThis.source;
		console.log("->> [onTest2] Player", source, _source, ...args);
	}

	@RegisterCommand("test")
	public async onTestCommand(source: number, args: string[]) {

		console.log(`->> [onTestCommand] Player ${source} executed test command with args: ${args}`);

		this.emitter.emitNet(TestEvents.TEST, source);
	}
}
