export interface Stateful {
	setState(key: string, value: any): void;
	getState<V = never>(key: string): V;
	hasState(key: string): boolean;
	removeState(key: string): boolean;
}
