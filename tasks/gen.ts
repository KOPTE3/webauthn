import * as _glob from 'glob';
import * as util from 'util';
import * as path from 'path';
import generate from '../lib/generator';


const glob = util.promisify(_glob);

export interface GenOptions {
	root: string;
}

export default async function (options: GenOptions): Promise<void> {
	const files = await glob('**/*.ts', {cwd: options.root, absolute: true, ignore: '*.gen.ts'});

	for (const source of files) {
		const {dir, name} = path.parse(source);
		const destination = path.join(dir, `${name}.gen.ts`);
		await generate(source, destination);
	}
}
