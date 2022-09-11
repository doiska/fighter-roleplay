import { Injectable } from "@fighter/framework/decorators";

import { CharacterEntity } from "@entities/character.entity";

import { Collection } from "@discordjs/collection";
import { ICharacter } from "@typings/authentication/character";
import { AtLeast } from "@typings/utils/type.utils";

@Injectable()
export class PlayerService {

	private readonly _players: Collection<number, CharacterEntity>;

	constructor() {
		console.log("->> PlayerService constructor");
		this._players = new Collection<number, CharacterEntity>();
	}

	public addPlayer(source: number, player: AtLeast<ICharacter, "accountId" | "identifier">): CharacterEntity {
		const entity = new CharacterEntity(source, player);
		this._players.set(this.ensureSourceIsNumber(source), entity);
		return entity;
	}

	public removePlayer(source: number | string): void {
		this._players.delete(this.ensureSourceIsNumber(source));
	}

	public getPlayer(source: number | string): CharacterEntity {
		return this._players.get(this.ensureSourceIsNumber(source));
	}

	public getPlayerByCharacterId(characterId: number): CharacterEntity {
		return this._players.find((player) => player.characterId === characterId);
	}

	public getPlayerByIdentifier(identifier: string): CharacterEntity {
		return this._players.find((player) => player.identifier === identifier);
	}

	private ensureSourceIsNumber(source: string | number): number {
		if (typeof source === "string") {
			return parseInt(source);
		}
		return source;
	}
}
