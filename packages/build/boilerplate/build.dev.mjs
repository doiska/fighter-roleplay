import { prepareBuild } from '../build/build.mjs';
import { build } from "esbuild";

const prepare = prepareBuild('./resources', 'core/dist');

const watch = (env) => build(prepare(env));

watch('server').then(() => console.log('Build started!'));
watch('client').then(() => console.log('Build started!'));
