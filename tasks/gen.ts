import * as glob from 'glob';

export interface GenOptions {
	root: string;
}

export default async function (options: GenOptions): Promise<void> {
	console.log(options.root);

	debugger;

	glob.Glob;
}
