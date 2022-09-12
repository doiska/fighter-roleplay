import { Controller, ClientEvent } from "@fighter/framework/decorators";
import { EventEmitter } from "@fighter/framework/services";

import { CustomizationEvents } from "@events/customization";


@Controller()
export class CustomizationController {

	constructor(private readonly emitter: EventEmitter) {}

	@ClientEvent(CustomizationEvents.CUSTOMIZATION_SAVED)
	public onPlayerLoaded(source: number, customization: string) {
		console.log(`[customizationController] Player ${source} has been loaded.`, customization);
	}
}
