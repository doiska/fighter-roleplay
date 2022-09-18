export type ItemType = ''

export interface Item extends ItemPosition {
	type: string;
	image: string;
	description: string;
	value?: number;
	_piKey?: string;
}

interface ItemPosition {
	topLeft: string;
	bottomRight: string;
	width: number;
}

export interface ItemList {
	house_keys: Item[];
	business_keys: Item[];
	vehicles: Item[];
	weapons: Item[];
	misc: Item[];
}
