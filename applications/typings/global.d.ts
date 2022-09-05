

interface Core {
	getCharacters()
}

// @ts-ignore
declare module global {
	var exports: {
		core: Core
	};
}

