import { ICharacter } from "@typings/authentication/character";

export class PlayerEntity implements ICharacter {

	public readonly accountId: number;
	public readonly characterId: number;
	public readonly source: string | number;
	public readonly identifier: string;
	public name: string;

	public gender?: number;

	public bank?: number;
	public cash?: number;
	public cloth_preset?: number;
	public faction?: number;

	public job?: number;
	public payCheck?: number;
	public playing_time?: number;

	constructor(source: string | number, player: Partial<ICharacter>) {
		Object.assign(this, player);
		this.source = source;
	}
}
