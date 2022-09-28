
import { Xiao } from "@fighter/framework/decorators";

import {CharacterScreenController} from "../events/character_screen.controller";
 
@Xiao({
	controllers: [CharacterScreenController],
	providers: []
})
export class XiaoApp {}
