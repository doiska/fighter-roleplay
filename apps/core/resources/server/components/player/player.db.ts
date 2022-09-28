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

	public getCharacterById(identifier: string, characterId: number): Promise<CharacterModel> {
		return this.repository.findOne({ where: { identifier, characterId } });
	}

	public async getCharacters(identifier: string): Promise<CharacterModel[]> {
		return this.repository.find({ where: { identifier } });
	}

	public async getCharactersByAccountId(id: number): Promise<CharacterModel | CharacterModel[]> {
		return this.repository.findOne({ where: { accountId: id } });
	}
}
