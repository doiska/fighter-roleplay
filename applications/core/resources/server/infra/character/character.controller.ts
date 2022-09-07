import { Controller } from "@fighter/framework/decorators";
import { EventEmitter } from "@fighter/framework/services";
import { CharacterService } from "@infra/character/character.service";

@Controller()
export class CharacterController {

	constructor(private emitter: EventEmitter, private service: CharacterService) {}

}
