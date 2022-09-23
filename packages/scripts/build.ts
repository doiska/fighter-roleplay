import { esbuildDecorators } from "@anatine/esbuild-decorators";
import chalk from "chalk";
import { exec } from "child_process";
import {BuildOptions} from "esbuild";
import { resolve } from "path";

export function prepareBuild(sourcePath: string): (env: string, buildFolderPath: string) => BuildOptions {

	const cleanName = ` ${sourcePath.split("/")[2].toUpperCase()} `;
	const app = chalk.bgBlue(chalk.black(cleanName));

	const log_success = (service: string, ...args: any[]) => console.log(chalk.green(`${app} [${service}]`), ...args);
	const log_info = (service: string, ...args) => console.log(chalk.blue(`${app} [${service}]`), ...args);
	const log_error = (service: string, ...args) => console.log(chalk.red(`${app} [${service}]`), ...args);

	const onRebuild = (target, err, { warnings }) => {
		if (err) return log_error("WATCH", "Rebuild failed :(", err);

		log_success("TYPESCRIPT", "Rebuild succeeded!", warnings);
		log_success("TYPESCRIPT", "Checking types...");

		const typeCheck = exec("tsc -p " + target);
		typeCheck.on("data", (d) => log_info("TYPESCRIPT", `${d.toString()}`));
		typeCheck.on("error", (_err) => log_error("TYPESCRIPT", "Typechecking failed.", _err));
		typeCheck.on("exit", () => log_success("TYPESCRIPT", "Typechecking succeeded."));
	};

	return (env, buildFolderPath) => {
		const folder = resolve(sourcePath, `./${env}`);
		const target = resolve(sourcePath, `${folder}/${env}.ts`);
		const isServer = env === "server";

		return {
			entryPoints: [target],
			outfile: resolve(buildFolderPath, `${env}/${env}.js`),
			bundle: true,
			platform: "node",
			external: ["typeorm"],
			target: isServer ? ["es2016"] : ["chrome58"],
			format: isServer ? "cjs" : "iife",
			plugins: [esbuildDecorators({ tsconfig: `${folder}/tsconfig.json` })],
			watch: { onRebuild: (err, res) => onRebuild(folder, err, res) }
		};
	};
}
