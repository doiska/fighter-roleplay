import {readFileSync} from "fs";

type Manifest = {
	server_scripts?: string[];
	client_scripts?: string[];
	files?: string[];
	dependencies?: string[];
}

export const parseFXManifest = (manifest: string) => {
	const file = readFileSync(manifest, "utf-8").split("\n");

	const start = [];
	const end = [];

	for(let i = 0; i < file.length; i++) {
		const line = file[i];

		if(line.includes("{")) start.push(i);
		else if(line.includes("}")) end.push(i);
	}

	const manifestData = {} as Manifest;

	for(let i = 0; i < start.length; i++) {
		const _start = start[i];
		const _end = end[i];
		const _key = file[_start].trim().replace("{", "").trim();

		manifestData[_key] = file.slice(_start + 1, _end).map(l => l.trim().replace(/"/g, "").replace(/'/g, ""));
	}

	return manifestData;
};
