import { RegisterCommand, Controller, ClientEvent, ServerEvent } from "@fighter/framework/decorators";
import { EventEmitter } from "@fighter/framework/services";

import { PlayerEvents } from "@events/player";
import { TestEvents } from "@events/test";

@Controller()
export class SpawnListener {

	constructor(private emitter: EventEmitter) {
		console.log("SpawnListener");
	}

	@ServerEvent(TestEvents.TEST)
	public onSpawnPlayer(...params: any[]) {
		console.log("Test event", params, global.source);
	}

	@ClientEvent("onClientResourceStart")
	public onResourceStart(resource: string) {

		if (resource === GetCurrentResourceName()) {
			console.log(`Resource ${resource} started with`);
			this.emitter.emitNet(PlayerEvents.PLAYER_LOADED);
		}
	}

	@RegisterCommand("test2")
	public async onTestCommand(source: number, args: string[]) {

		console.log(`->> [onTestCommand] Player ${source} executed test2 command with args: ${args}`);

		this.emitter.emitNet(PlayerEvents.PLAYER_LOADED);
	}
}
