import { ValidIdentifiers, Identifier } from "@typings/five/constants";

const DEFAULT_IDENTIFIER = "license";

export const parseIdentifiers = (identifiers: string[]) => {
	const names = ["steam", "discord", "license", "xbl", "live", "fivem", "ip"];

	return identifiers.reduce((acc, identifier) => {
		const [name] = identifier.split(":");
		if (names.includes(name)) {
			acc[name as ValidIdentifiers] = identifier as Identifier;
			console.log(`[AccountHelper] Parsed identifier ${identifier}`);
		}
		return acc;
	}, {} as Record<ValidIdentifiers, Identifier>);
};

export const getUserIdentifier = (source: string | number) => {
	const identifiers = getPlayerIdentifiers(source) as Identifier[];
	return identifiers.find((identifier) => identifier.startsWith(DEFAULT_IDENTIFIER)) as Identifier;
};
