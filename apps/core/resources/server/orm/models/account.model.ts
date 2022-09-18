import { IAccount } from "@typings/authentication/account.model";
import { Identifier } from "@typings/five/constants";
import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

const parseArrayToString = (array: string[]) => array.join(",");
const parseStringToArray = (string: string) => string.split(",");

@Entity({ name: "account" })
export class AccountModel implements IAccount {
	@PrimaryGeneratedColumn()
		id: number;

	@Column({ type: "varchar" })
		identifier: Identifier;

	@Column({ type: "varchar", transformer: { from: parseStringToArray, to: parseArrayToString } })
		identifiers: Identifier[];

	@Column({ type: "boolean", default: false })
		whitelisted: boolean;
	
	@Column({ type: "smallint", default: 0 })
		businessSlots: number;

	@Column({ type: "smallint", default: 0 })
		charSlots: number;

	@Column({ type: "smallint", default: 0 })
		houseSlots: number;

	@Column({ type: "smallint", default: -1 })
		premium: number;
}
