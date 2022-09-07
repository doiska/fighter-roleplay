import { Controller, LocalEvent } from "@fighter/framework/decorators";
import { EventEmitter } from "@fighter/framework/services";

@Controller()
export class SpawnController {

	constructor(private emitter: EventEmitter) {
		console.log("SpawnController");
	}

	@LocalEvent('spawnPlayer')
	public onPlayerJoining(_eventName: string, source: string) {
		console.log("onPlayerJoining", source);
		this.emitter.emitNet('spawnPlayer', parseInt(source), 'mp_m_freemode_01', { x: 0, y: 0, z: 0 }, 0);
	}
}
