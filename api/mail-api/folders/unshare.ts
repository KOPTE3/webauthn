import {Credentials, RequestResult} from '../../../types/api';
import call, {callAsync} from '../call';


export interface FoldersUnshareOptions {
	unshared_email: string;
	folder_id: number;
}

/**
 * @see http://api.tornado.dev.mail.ru/folders/unshare
 */
export default function foldersUnshare (options: FoldersUnshareOptions, credentials?: Credentials): RequestResult<null> {
	return call('folders/unshare', options, 'POST', credentials);
}

export async function foldersUnshareAsync (
	options: FoldersUnshareOptions,
	credentials?: Credentials,
): Promise<RequestResult<null>> {
	return callAsync('folders/unshare', options, 'POST', credentials);
}
