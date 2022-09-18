import { prepareBuild, copy } from '../../packages/build/build.mjs';
import { build } from "esbuild";
import { exec } from "child_process";

const prepare = prepareBuild('./resources', 'custom/dist');

const watch = (env) => build(prepare(env));

watch('server').then(() => console.log('Build started!'));
watch('client').then(() => console.log('Build started!'));

exec('cd ./resources/web && yarn build', (err, stdout, stderr) => {
	if (err) {
		console.error(err);
		return;
	}
	console.log(stdout);
	copy('./resources/web/dist', 'custom/dist/web').then(() => console.log('Build started!'));
});

