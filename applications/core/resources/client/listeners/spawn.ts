import { Controller, NetEvent } from "@fighter/framework/decorators";
import { EventEmitter } from "@fighter/framework/services";

@Controller()
export class SpawnListener {

	constructor(private emitter: EventEmitter) {
		console.log("SpawnListener");
	}

	@NetEvent("spawnPlayer")
	public onSpawnPlayer(_eventName: string, ...params: any[]) {
		console.log(_eventName, "onSpawnPlayer", params);
	}
}
