/* eslint-disable */

import { Collection } from "@discordjs/collection";

import {ICharacter} from "./authentication/character";
import {Stateful} from "./shared/stateful";

interface Core {
	getPlayer(source: number): ICharacter & Stateful;
	getPlayerByCharacterId(characterId: number): ICharacter & Stateful;
	getPlayerByIdentifier(identifier: string): ICharacter & Stateful;
	getPlayers(): Collection<number, ICharacter & Stateful>
}

declare global {
	var Core: Core;
	var exports: any | {
		core: {
			getSharedObject: () => Core;
		}
	};
}

export {};
