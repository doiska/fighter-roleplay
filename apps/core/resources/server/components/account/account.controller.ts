import { Controller, ServerEvent } from "@fighter/framework/decorators";
import { EventEmitter } from "@fighter/framework/services";

import { AccountService } from "@components/account/account.service";
import { PlayerService } from "@components/player/player.service";

import { AccountEvents } from "@events/account";
import { getUserIdentifier } from "@helpers/account.helper";
import { Wait } from "@helpers/task.helper";
import { Deferral } from "@typings/utils/deferral";

@Controller()
export class AccountController {

	constructor(private emitter: EventEmitter, private accountService: AccountService, private playerService: PlayerService) {
		console.log("->> AccountController initialized");
	}

	@ServerEvent("playerConnecting")
	public async onPlayerConnecting(source: number, name: string, _setKickReason: (reason?: string) => void, deferrals: Deferral) {
		deferrals.defer();

		await Wait(300);

		deferrals.update(`Hello ${name}, validating your license...`);

		const identifier = getUserIdentifier(source);
		const accountStatus = await this.accountService.validateAccountStatus(identifier);

		if(accountStatus === "INVALID_CREDENTIALS") {
			deferrals.done("You must have a Steam and a FiveM license to play on this server.");
			return;
		}

		if(accountStatus === "ACCOUNT_NOT_WHITELISTED" || accountStatus === "ACCOUNT_NOT_FOUND") {
			deferrals.done("Conta não encontrada/aprovada.");
			return;
		}

		if(accountStatus === "SUCCESS") {
			await Wait(100);
			deferrals.update("Success! Loading your account...");
			deferrals.done();
		}
	}

	@ServerEvent("playerJoining")
	public async onPlayerJoining(source: number) {

		console.log(`[playerJoining] Player ${source} has been loaded.`);

		const identifier = getUserIdentifier(source);

		console.log(`[onPlayerJoining] Player ${source} (${identifier}) is joining the server.`);

		if(!identifier) {
			console.log(`[onPlayerJoining] Player ${source} has no identifier.`);
			return;
		}

		const account = await this.accountService.getAccount(identifier);

		if(!account) {
			console.log(`[onPlayerJoining] Player ${source} has no account.`);
			return;
		}

		return this.emitter.emit(AccountEvents.ACCOUNT_LOADED, source, account);
	}

	@ServerEvent("playerDropped")
	public async onPlayerDropped(source: number) {
		const _source = global.source;

		console.log(`[onPlayerDropped] Player ${source} ${_source} has been dropped.`);

		await this.emitter.emit(AccountEvents.ACCOUNT_UNLOADED, source);
		this.playerService.removePlayer(source);
	}
}
