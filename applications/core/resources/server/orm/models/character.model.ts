import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { ICharacter } from "@typings/authentication/character";

@Entity({ name: 'character' })
export class CharacterModel implements ICharacter {

	@PrimaryGeneratedColumn()
	characterId: number;

	@Column()
	accountId: number;

	@Column()
	name: string;

	@Column()
	bank: number;

	@Column()
	cash: number;

	@Column()
	cloth_preset: number;

	@Column()
	faction: number;

	@Column()
	gender: number;

	@Column()
	job: number;

	@Column()
	payCheck: number;

	@Column()
	playing_time: number;
}
