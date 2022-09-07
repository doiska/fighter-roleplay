import { PlayerEntity } from "@entities/player.entity";

import { Collection } from "@discordjs/collection";

export class PlayerService {

	private readonly _players: Collection<number, PlayerEntity>;

	constructor() {
		this._players = new Collection<number, PlayerEntity>();
	}

	public addPlayer(player: PlayerEntity): void {
		this._players.set(this.ensureSourceIsNumber(player.source), player);
	}

	public removePlayer(source: number | string): void {
		this._players.delete(this.ensureSourceIsNumber(source));
	}

	getPlayer(source: number | string): PlayerEntity {
		return this._players.get(this.ensureSourceIsNumber(source));
	}

	getPlayerByCharacterId(characterId: number): PlayerEntity {
		return this._players.find((player) => player.characterId === characterId);
	}

	getPlayerByIdentifier(identifier: string): PlayerEntity {
		return this._players.find((player) => player.identifier === identifier);
	}

	private ensureSourceIsNumber(source: string | number): number {
		if (typeof source === "string") {
			return parseInt(source);
		}
		return source;
	}
}
