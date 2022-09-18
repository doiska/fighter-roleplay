import { Injectable } from "@fighter/framework/decorators";

import { AccountDB } from "@components/account/account.db";

import { IAccountCreate } from "@typings/authentication/account.model";
import { Identifier } from "@typings/five/constants";
import { AccountErrors, Responses } from "@typings/responses";

@Injectable()
export class AccountService {

	private accountDB: AccountDB;

	constructor() {
		console.log("AccountService initialized");
		this.accountDB = new AccountDB();
	}

	public async createAccount(accountCreate: IAccountCreate) {

		if(!accountCreate.identifiers || accountCreate.identifiers.length === 0) {
			throw new Error("No identifiers provided");
		}

		return this.accountDB.createAccount(accountCreate);
	}

	public async validateAccountStatus(identifier?: Identifier): Promise<Responses | AccountErrors> {

		if(!identifier) {
			return AccountErrors.INVALID_CREDENTIALS;
		}

		const account = await this.getAccount(identifier);

		if(!account) {
			return AccountErrors.ACCOUNT_NOT_FOUND;
		}

		if(!account.whitelisted) {
			return AccountErrors.ACCOUNT_NOT_WHITELISTED;
		}

		return Responses.SUCCESS;
	}

	public async getAccount(identifier: Identifier) {
		return this.accountDB.getAccount(identifier);
	}
}
