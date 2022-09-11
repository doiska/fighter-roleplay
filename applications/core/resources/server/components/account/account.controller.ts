import { Controller, LocalEvent } from "@fighter/framework/decorators";
import { EventEmitter } from "@fighter/framework/services";

import { AccountService } from "@components/account/account.service";
import { PlayerService } from "@components/player/player.service";
import { CharacterEntity } from "@entities/character.entity";

import { AccountEvents } from "@events/account";
import { PlayerEvents } from "@events/player";
import { getUserIdentifier } from "@helpers/account.helper";
import { Wait } from "@helpers/task.helper";
import { Deferral } from "@typings/utils/deferral";
 
@Controller()
export class AccountController {

	constructor(private emitter: EventEmitter, private accountService: AccountService, private playerService: PlayerService) {
		console.log("->> AccountController initialized");
	}

	@LocalEvent("playerConnecting")
	public async onPlayerConnecting(_eventName: string, source: number, name: string, _setKickReason: (reason?: string) => void, deferrals: Deferral) {
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

			const { id } = await this.accountService.getAccount(identifier);

			const entity = this.playerService.addPlayer(source, {
				accountId: id,
				identifier: identifier,
			});

			await Wait(500);

			await this.emitter.emit(PlayerEvents.PLAYER_LOADED, source, entity);

			deferrals.done();
		}
	}

	@LocalEvent("playerJoining")
	public async onPlayerJoining(_eventName: string, source: string) {
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

		return this.emitter.emitNet(AccountEvents.ACCOUNT_LOADED, source, account);
	}

	@LocalEvent("playerDropped")
	public async onPlayerDropped(_eventName: string, source: string) {
		await this.emitter.emit(PlayerEvents.PLAYER_UNLOADED, source);
		this.playerService.removePlayer(source);
		console.log(`[playerDropped] Removed player ${source} from the server.`);
	}

	@LocalEvent(PlayerEvents.PLAYER_LOADED)
	public async onPlayerLoaded(_eventName: string, source: string, entity: CharacterEntity) {
		console.log(`[onPlayerLoaded] Player ${source} has been loaded.`, entity);
	}
}
