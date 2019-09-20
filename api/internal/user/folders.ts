import { RequestResult } from '../../../types/api';
import call, { callAsync } from '../call';

type Options = {email: string} | {id: string};

export type FoldersBody = Array<{
	id: number;
	system: boolean;
	type: 'inbox' | 'sent' | 'drafts' | 'templates' | 'spam' | 'trash' | 'archive' | 'user' | 'social' | 'promotions'
		| 'newsletters';
	name: string;
	child: boolean;
	children: boolean;
}>;

/**
 * @see https://apidoc.devmail.ru/e.mail.ru/user/folders
 */
export default function userFolders(options: Options): RequestResult<FoldersBody> {
	return call('user/folders', options);
}

export async function userFoldersAsync(options: Options): Promise<RequestResult<FoldersBody>> {
	return callAsync('user/folders', options);
}
