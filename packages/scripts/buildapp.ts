import chalk from "chalk";
import {black, red, bgRed, bgGreen, green, redBright, blue} from "colorette";
import {build} from "esbuild";
import {readdirSync, copyFileSync} from "fs";
import {resolve} from "path";

import {prepareBuild} from "./build.js";
import {parseFXManifest} from "./readFXManifest";

const BUILD_PATH = resolve("D:\\FiveM Server\\server\\resources\\[fighter_dist]");

const except = ["shared", "typings", "events", ...process.argv.slice(2)];
const manifests = ["fxmanifest.lua"];

const folders = readdirSync("./apps")
	.filter((f) => !except.includes(f))
	.map((f) => `./apps/${f}`);


folders.forEach(folder => {
	const appName = folder.split("/")[2];
	const prepare = prepareBuild(`${folder}/resources`);

	const buildPath = resolve(BUILD_PATH, appName);
	const files = manifests.filter(m => readdirSync(folder).includes(m));

	const buildStage = files.map(file => {
		const manifest = parseFXManifest(`${folder}/${file}`);

		return {
			server: prepare("server", buildPath),
			client: prepare("client", buildPath),
			copy: () => {
				copyFileSync(`${folder}/${file}`, `${buildPath}/${file}`);

				if(!manifest.files) {
					console.log(chalk.red("No files found in manifest"), manifest);
					return;
				}
			}
		};
	});

	buildStage.forEach(async stage => {
		try {
			const milis = Date.now();

			await build(stage.server);
			await build(stage.client);
			stage.copy();

			console.log(bgGreen(black("[BUILD]")), green(`Successfully built ${blue(appName.toUpperCase())} in ${(Date.now() - milis) / 1000}s.`));
		} catch (e) {
			console.log(bgRed(black("[BUILD]")), red(`Failed to build ${redBright(appName)}.`));
			console.log(e);
		}
	});
});
