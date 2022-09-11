import { Identifier, ValidIdentifiers } from "../five/constants";

export interface IAccount {
	id: number;
	whitelisted: boolean;
	identifiers: Identifier[]
	premium: number
	charSlots: number;
	houseSlots: number
	businessSlots: number;
}

export interface IAccountCreate {
	name: string;
	whitelisted: boolean;
	identifier: Identifier;
	identifiers: Identifier[];
}
