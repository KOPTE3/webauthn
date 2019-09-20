import { MailAPI } from '@qa/api';
import { Credentials, RequestResult } from '../../../types/api';
import call, { callAsync } from '../call';

/**
 * @see https://apidoc.devmail.ru/e.mail.ru/folders/add
 */
export default function foldersAdd(options: MailAPI.FoldersAdd, credentials?: Credentials): RequestResult<string[]> {
	return call('folders/add', options, 'POST', credentials);
}

export async function foldersAddAsync(
	options: MailAPI.FoldersAdd,
	credentials?: Credentials
): Promise<RequestResult<string[]>> {
	return callAsync('folders/add', options, 'POST', credentials);
}
