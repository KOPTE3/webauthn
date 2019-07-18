import { Credentials, RequestResult } from '../../../types/api';
import call, { callAsync } from '../call';

export interface FoldersShareOptions {
	shared_email: string;
	folder_id: number;
}

/**
 * @see http://api.tornado.dev.mail.ru/folders/share
 */
export default function foldersShare(options: FoldersShareOptions, credentials?: Credentials): RequestResult<null> {
	return call('folders/share', options, 'POST', credentials);
}

export async function foldersShareAsync(
	options: FoldersShareOptions,
	credentials?: Credentials
): Promise<RequestResult<null>> {
	return callAsync('folders/share', options, 'POST', credentials);
}
