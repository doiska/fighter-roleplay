export const getParsedIdentifiers = (source: string | number) => {
	const names = ["steam", "discord", "license", "xbl", "live", "fivem", "ip"];
	const identifiers = getPlayerIdentifiers(source);

	return identifiers.reduce((acc, identifier) => {
		const [name, id] = identifier.split(":");
		if (names.includes(name)) {
			acc[name] = id;
		}
		return acc;
	}, {} as Record<string, string>);
};
