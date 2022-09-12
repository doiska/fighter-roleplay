import chalk from 'chalk';
import { exec } from 'child_process';
import { resolve } from 'path';
import { esbuildDecorators } from "@anatine/esbuild-decorators";

const BUILD_PATH = resolve('D:\\FiveM Server\\server\\resources\\[fighter_dist]');

export function copy(src, dest) {
	return new Promise((res, reject) => {

		const path = resolve(BUILD_PATH, dest);

		exec(`xcopy "${src}" "${path}" /E /Y /I`, (err, stdout, stderr) => {
			if (err) {
				reject(err);
			} else {
				res(stdout);
			}
		});
	});
}

export function prepareBuild(sourcePath, buildFolder) {

	const log_success = (service, ...args) => console.log(chalk.greenBright(`[${service}]`), ...args);
	const log_info = (service, ...args) => console.log(chalk.blue(`[${service}]`), ...args);
	const log_error = (service, ...args) => console.log(chalk.red(`[${service}]`), ...args);

	const buildPath = resolve(BUILD_PATH, buildFolder);

	log_info('ESBUILD', 'Starting build...');
	log_info('ESBUILD', 'Build path:', buildPath);

	const onRebuild = (target, err, { warnings }) => {
		if (err) return log_error('WATCH', 'Rebuild failed :(', err);

		log_success('TYPESCRIPT', 'Rebuild succeeded!', warnings)
		log_success('TYPESCRIPT', 'Checking types...');

		const typeCheck = exec('tsc -p ' + target);
		typeCheck.on('error', (_err) => log_error('TYPESCRIPT', 'Typechecking failed.', _err))
		typeCheck.on('data', (d) => log_info('TYPESCRIPT', `${d.toString()}`));
		typeCheck.on('exit', () => log_success('TYPESCRIPT', 'Typechecking succeeded.'));
	}

	return (env) => {
		const folder = resolve(sourcePath, `./${env}`);
		const target = resolve(sourcePath, `${folder}/${env}.ts`);
		const isServer = env === 'server';

		return {
			entryPoints: [target],
			outfile: resolve(buildPath, `${env}/${env}.js`),
			bundle: true,
			platform: 'node',
			external: ['typeorm'],
			target: isServer ? ['es2016'] : ['chrome58'],
			format: isServer ? 'cjs' : 'iife',
			plugins: [esbuildDecorators({ tsconfig: `${folder}/tsconfig.json` })],
			watch: { onRebuild: (err, res) => onRebuild(folder, err, res) }
		}
	};
}
