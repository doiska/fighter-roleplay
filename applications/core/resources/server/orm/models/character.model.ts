import { ICharacter } from "@typings/authentication/character";
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: "character" })
export class CharacterModel implements ICharacter {

	@PrimaryGeneratedColumn()
		characterId: number;

	@Column()
		accountId: number;

	@Column()
		name: string;

	@Column()
		identifier: string;

	@Column({ default: 0 })
		bank: number;

	@Column({ default: 500 })
		cash: number;

	@Column({ default: 0 })
		cloth_preset: number;

	@Column({ default: -1 })
		faction: number;

	@Column({ default: 0 })
		gender: number;

	@Column({ default: -1 })
		job: number;

	@Column({ default: 0 })
		payCheck: number;

	@Column({ default: 0 })
		playing_time: number;
}
