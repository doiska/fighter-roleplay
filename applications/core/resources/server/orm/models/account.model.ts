import { IAccount } from "@typings/authentication/account.model";
import { Identifier } from "@typings/five/constants";
import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

const parseArrayToString = (array: string[]) => array.join(",");
const parseStringToArray = (string: string) => string.split(",");

@Entity({ name: "account" })
export class AccountModel implements IAccount {
	@PrimaryGeneratedColumn()
		id: number;

	@Column()
		businessSlots: number;

	@Column()
		charSlots: number;

	@Column()
		houseSlots: number;

	@Column({ type: "varchar" })
		identifier: Identifier;

	@Column({ type: "varchar", transformer: { from: parseStringToArray, to: parseArrayToString } })
		identifiers: Identifier[];

	@Column()
		premium: number;
}
