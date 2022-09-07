import { Controller } from "@fighter/framework/decorators";
import { EventEmitter } from "@fighter/framework/services";

import { AccountDB } from "@controllers/account/account.db";
import { AccountService } from "@controllers/account/account.service";
 
@Controller()
export class AccountController {

	constructor(
		private readonly _emitter: EventEmitter,
		private readonly _acountService: AccountService,
		private readonly _accountDB: AccountDB
	) {
		console.log("AccountController");
		console.log("this._emitter", this._emitter);
		console.log("this._acountService", this._acountService);
		console.log("this._accountDB", this._accountDB);
	}
}
