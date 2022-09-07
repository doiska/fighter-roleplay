import chalk from 'chalk';
import { exec } from 'child_process';
import { resolve } from 'path';
import { esbuildDecorators } from "@anatine/esbuild-decorators";
import { build } from "esbuild";


const log_success = (service, ...args) => console.log(chalk.greenBright(`[${service}]`), ...args);
const log_info = (service, ...args) => console.log(chalk.blue(`[${service}]`), ...args);
const log_error = (service, ...args) => console.log(chalk.red(`[${service}]`), ...args);

async function dev() {

	const rootPath = resolve('D:\\FiveM Server\\');
	const buildPath = resolve(rootPath, 'server\\resources\\[fighter_dist]\\core\\dist');

	log_info('ESBUILD', 'Starting build...');
	log_info('ESBUILD', 'Build path:', buildPath);
	log_info('ESBUILD', 'Root path:', rootPath);

	const onRebuild = (target, err, { warnings }) => {
		if (err) return log_error('WATCH', 'Rebuild failed :(', err);

		log_success('TYPESCRIPT', 'Rebuild succeeded!', warnings)
		log_success('TYPESCRIPT', 'Checking types...');

		const typeCheck = exec('tsc -p ' + target);
		typeCheck.on('error', (_err) => log_error('TYPESCRIPT', 'Typechecking failed.', _err))
		typeCheck.on('data', (d) => log_info('TYPESCRIPT', `${d.toString()}`));
		typeCheck.on('exit', () => log_success('TYPESCRIPT', 'Typechecking succeeded.'));
	}

	const prepare = (env) => {
		const folder = resolve(`./resources/${env}`);
		const target = resolve(`${folder}/${env}.ts`);
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
	}

	const watch = (env) => build(prepare(env));

	await watch('server');
	await watch('client')

	log_success('WATCH', 'Watching for changes...');
}

dev();
