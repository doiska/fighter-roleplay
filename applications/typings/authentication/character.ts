export interface ICharacter extends BaseInfo, GameInfo, CustomizationInfo, BankInfo, DetailsInfo {}

interface BaseInfo {
	characterId: number;
	accountId: number;
	identifier: string;
	name: string;
}

export interface GameInfo {
	faction?: number;
	job?: number;
}

interface CustomizationInfo {
	gender?: number;
	cloth_preset?: number;
}

interface BankInfo {
	cash?: number;
	bank?: number;
	payCheck?: number;
}

interface DetailsInfo {
	playing_time?: number;
}
