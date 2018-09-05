import { MailAPI } from '@qa/api';
import { Credentials, RequestResult } from '../../../types/api';
import call, { callAsync } from '../call';

/**
 * @see http://api.tornado.dev.mail.ru/folders/open
 */
export default function foldersOpen(options: MailAPI.FoldersOpen, credentials?: Credentials): RequestResult<string[]> {
	return call('folders/open', options, 'POST', credentials);
}

export async function foldersOpenAsync(
	options: MailAPI.FoldersOpen,
	credentials?: Credentials
): Promise<RequestResult<string[]>> {
	return callAsync('folders/open', options, 'POST', credentials);
}
