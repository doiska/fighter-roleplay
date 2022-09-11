export interface Deferral {
	defer(): void;
	update(value: string): void;
	done(reason?: string): void;
}
