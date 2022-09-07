export interface ICharacter extends BaseInfo, GameInfo, CustomizationInfo, BankInfo, DetailsInfo {}

interface BaseInfo {
	characterId: number;
	accountId: number;
	name: string;
	gender: number;
}

export interface GameInfo {
	faction: number;
	job: number;
}

interface CustomizationInfo {
	cloth_preset: number;
}

interface BankInfo {
	cash: number;
	bank: number;
	payCheck: number;
}

interface DetailsInfo {
	playing_time: number;
}
