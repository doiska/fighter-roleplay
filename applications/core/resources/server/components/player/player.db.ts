import { XiaoDS } from "@app/XiaoDS";

import { CharacterModel } from "@models/character.model";
import { Repository } from "typeorm";

export class PlayerDB {

	private repository: Repository<CharacterModel>;

	public constructor() {
		this.repository = XiaoDS.getRepository(CharacterModel);
	}

	public async insertCharacter(character: CharacterModel): Promise<CharacterModel> {
		return this.repository.save(character);
	}

	public async updateCharacter(character: CharacterModel): Promise<CharacterModel> {
		return this.repository.save(character);
	}

	public async getCharacterByAccountId(id: number): Promise<CharacterModel> {
		return this.repository.findOne({ where: { accountId: id } });
	}

	public async getCharacterByIdentifier(identifier: string): Promise<CharacterModel> {
		return this.repository.findOne({ where: { identifier } });
	}

	public async getCharacterById(id: number): Promise<CharacterModel> {
		return this.repository.findOne({ where: { characterId: id } });
	}
}
