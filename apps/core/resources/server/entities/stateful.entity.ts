import { Collection } from "@discordjs/collection";
import {Stateful} from "@typings/shared/stateful";

export class StatefulEntity implements Stateful {

	private readonly _state: Collection<string, any> = new Collection();

	public setState(key: string, value: any) {
		this._state.set(key, value);
	}

	public getState<V = never>(key: string): V {
		return this._state.get(key);
	}

	public hasState(key: string) {
		return this._state.has(key);
	}

	public removeState(key: string) {
		return this._state.delete(key);
	}
}
