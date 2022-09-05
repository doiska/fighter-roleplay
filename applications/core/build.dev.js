async function watch() {
	const chalk = (await import('chalk')).default;
	const exec = (await import('child_process')).exec;
	const path = await import('path');

	const buildPath = path.resolve(__dirname, './dist');

	const { esbuildDecorators } = require('@anatine/esbuild-decorators');

	const onRebuild = (target, err, res) => {
		if (err) {
			console.error(chalk.red('Rebuild failed :('), err);
			return;
		}

		console.log(chalk.green('Rebuild succeeded!'), res.warnings);
		console.log(chalk.yellow('Checking types...'));

		const p = exec('tsc -p ' + target);

		p.on('error', (_err) => console.error(chalk.red('Typechecking failed.'), _err))
		p.on('data', (d) => console.log(chalk.yellow(`${d.toString()}`)))
	}

	const prepare = (env) => {
		const folder = path.resolve(`./resources/${env}`);
		const target = path.resolve(`${folder}/${env}.ts`);
		const isServer = env === 'server';

		return {
			entryPoints: [target],
			outfile: path.resolve(buildPath, `${env}/${env}.js`),
			bundle: true,
			platform: 'node',
			external: ['typeorm'],
			target: isServer ? ['es2016'] : ['chrome58'],
			format: isServer ? 'cjs' : 'iife',
			plugins: [esbuildDecorators({ tsconfig: `${folder}/tsconfig.paths.json` })],
			watch: {
				onRebuild: (err, res) => onRebuild(folder, err, res),
			}
		}
	}

	const build = (env) => require('esbuild').build(prepare(env));

	await build('server');
	await build('client')

	console.log(chalk.green('Watching for changes...'));
}

watch();
