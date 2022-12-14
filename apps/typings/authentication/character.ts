export interface ICharacter extends BaseInfo, GameInfo, CustomizationInfo, BankInfo, DetailsInfo, Status {
}

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
	pay_check?: number;
}

interface DetailsInfo {
	playing_time?: number;
}

interface Status {
	isConnected: boolean;
	isLoggedIn: boolean;
	isCharacterLoaded: boolean;
}

export interface ICharacterCreate {
	source: number;
	characterId: number;
	accountId: number;
	identifier: string;
	name: string;
}
