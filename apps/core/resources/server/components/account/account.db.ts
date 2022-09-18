import { XiaoDS } from "@app/XiaoDS";

import { AccountModel } from "@models/account.model";
import { IAccountCreate } from "@typings/authentication/account.model";
import { Identifier } from "@typings/five/constants";
import { Repository } from "typeorm";

export class AccountDB {

	private repository: Repository<AccountModel>;

	constructor() {
		this.repository = XiaoDS.getRepository(AccountModel);
	}

	public async createAccount(account: IAccountCreate): Promise<AccountModel> {
		return this.repository.save({ ...account });
	}

	public async updateAccount(identifier: Identifier, account: Partial<AccountModel>) {
		return this.repository.update({ identifier }, account);
	}

	public async deleteAccount(identifier: Identifier) {
		return this.repository.delete({ identifier });
	}

	public async getAccount(identifier: Identifier): Promise<AccountModel | undefined> {
		return this.repository.findOne({ where: { identifier } });
	}
}
