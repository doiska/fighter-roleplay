import { Collection } from "@discordjs/collection";

export class StatefulEntity {

	private readonly _state: Collection<string, never> = new Collection();

	public setState(key: string, value: never) {
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
