import { EventEmitter } from "@fighter/framework/services";

import { StatefulEntity } from "@entities/stateful.entity";

import { ICharacter } from "@typings/authentication/character";
import { Identifier } from "@typings/five/constants";
import { AtLeast } from "@typings/utils/type.utils";

export class CharacterEntity extends StatefulEntity	implements ICharacter {

	public readonly accountId: number;
	public readonly characterId: number;
	public readonly source: string | number;
	public readonly identifier: Identifier;
	public name: string;

	public gender?: number;

	public bank?: number;
	public cash?: number;
	public cloth_preset?: number;
	public faction?: number;

	public job?: number;
	public pay_check?: number;
	public playing_time?: number;

	public isConnected = false;
	public isLoggedIn = false;
	public isCharacterLoaded = false;

	constructor(source: string | number, player: AtLeast<ICharacter, "accountId" | "identifier">) {
		super();

		Object.assign(this, player);
		this.source = source;
	}

	public showCustomization(): void {
		if (!this.isConnected || !this.isLoggedIn) {
			return;
		}

		emitNet("fighter:showCustomization", this.source);
	}

	public kick(reason?: string): void {
		if (!this.isConnected || !this.isLoggedIn) {
			return;
		}

		emitNet("fighter:kick", this.source, reason);
	}
}
