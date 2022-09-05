import { Identifier, ValidIdentifiers } from "../five/constants";

export interface IAccount {
	id: number;
	identifier: Identifier;
	identifiers: Identifier[]
	premium: number
	charSlots: number;
	houseSlots: number
	businessSlots: number;
}
