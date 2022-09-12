import { Controller, ServerEvent } from "@fighter/framework/decorators";
import { EventEmitter } from "@fighter/framework/services";

import { CustomizationEvents } from "@events/customization";
import { Modules } from "@typings/modules";

@Controller()
export class CustomizationController {

	constructor(private readonly emitter: EventEmitter) {}
	@ServerEvent(CustomizationEvents.SHOW_CUSTOMIZATION)
	public onShowCustomization(_source: number) {
		console.log(`[customizationController] Player ${_source} has been loaded.`);

		exports[Modules.Customization].startPlayerCustomization((appearance: any) => {
			if (appearance) {
				console.log("Customization saved", source, appearance);
				return this.emitter.emitNet(CustomizationEvents.CUSTOMIZATION_SAVED, source, JSON.stringify(appearance));
			} else {
				console.log("Customization canceled");
			}
		});
	}
}
