import { Position } from "applications/typings/five/common";

export interface Faction {
	id: number;
	internalId: string;
	blipId: number;
	name: string;
	entranceX: number;
	entranceY: number;
	entranceZ: number;
	exit: Position;
	members: FactionMember[];
}

export interface FactionMember {
	id: number;
	rank: number;
	onlineId?: number;
}

export interface FactionVehicle {
	pos: Position;
	rotation: Position;
	modelHash: any;
	color?: number[];
}
