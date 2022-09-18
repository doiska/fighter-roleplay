import { Controller, ServerEvent } from "@fighter/framework/decorators";
import { EventEmitter } from "@fighter/framework/services";

import { CustomizationEvents } from "@events/customization";
import { startPlayerCustomization } from "@modules/customization";



@Controller()
export class CustomizationController {

	constructor(private readonly emitter: EventEmitter) {}

	@ServerEvent(CustomizationEvents.SHOW_CUSTOMIZATION)
	public onShowCustomization() {
		startPlayerCustomization(
			(appearance) => this.emitter.emitNet(CustomizationEvents.CUSTOMIZATION_SAVED, appearance)
		);
	}
}
