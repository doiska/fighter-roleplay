import {Injectable} from "@fighter/framework/decorators";

import {PlayerDB} from "@components/player/player.db";
import {CharacterEntity} from "@entities/character.entity";

import {Collection} from "@discordjs/collection";
import {ICharacter} from "@typings/authentication/character";
import {AtLeast} from "@typings/utils/type.utils";

@Injectable()
export class PlayerService {

	private readonly _players: Collection<number, CharacterEntity>;

	constructor(private readonly PlayerDB: PlayerDB) {
		this._players = new Collection<number, CharacterEntity>();
	}

	public addPlayer(source: number, player: AtLeast<ICharacter, "accountId" | "identifier">): CharacterEntity {
		const entity = new CharacterEntity(source, player);
		this._players.set(this.ensureSourceIsNumber(source), entity);
		return entity;
	}

	public async loadPlayer(identifier: string, characterId: number): Promise<ICharacter> {
		const player = this.getPlayerByIdentifier(identifier);

		if (player) {
			console.log("->> [loadPlayer] Player already loaded");
			return player;
		}

		console.log("->> [loadPlayer] Loading player from database");
		const entity = await this.PlayerDB.getCharacterById(identifier, characterId);

		if (entity) {
			console.log("->> [loadPlayer] Player loaded from database");
			return this.addPlayer(source, entity);
		}

		console.log("->> [loadPlayer] Player not found in database");
	}

	public removePlayer(source: number | string): void {
		this._players.delete(this.ensureSourceIsNumber(source));
	}

	public updatePlayer(source: number | string, player: Partial<ICharacter>) {
		if (!this._players.has(this.ensureSourceIsNumber(source))) {
			return;
		}

		const entity = this._players.get(this.ensureSourceIsNumber(source));
		Object.assign(entity, player);

		this._players.set(this.ensureSourceIsNumber(source), entity);
	}

	public getPlayer(source: number | string): CharacterEntity {
		return this._players.get(this.ensureSourceIsNumber(source));
	}

	public getPlayers(): Collection<number, CharacterEntity> {
		return this._players;
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
