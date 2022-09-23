/* eslint-disable no-var */

// extends globalThis.exports



// declare namespace globalThis {
// 	var exports: {
// 		appearance: {
// 			applyAppearance: (appearance: string) => void;
// 		}
// 	};
// }


interface Core {
	getPlayers(): string[];
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
