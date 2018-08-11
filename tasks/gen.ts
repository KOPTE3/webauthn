import * as _glob from 'glob';
import * as util from 'util';
import generate from '../lib/generator';


const glob = util.promisify(_glob);

export interface GenOptions {
	root: string;
}

export default async function (options: GenOptions): Promise<void> {
	if (!options.root) {
		throw new Error('Необходимо передать опцию --root');
	}
	const files = await glob('**/*.ts', {cwd: options.root, absolute: true, ignore: '*.gen.ts'});

	for (const source of files) {
		await generate(source);
	}
}
