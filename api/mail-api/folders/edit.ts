import { MailAPI } from '@qa/api';
import { Credentials, RequestResult } from '../../../types/api';
import call, { callAsync } from '../call';

/**
 * @see https://apidoc.devmail.ru/e.mail.ru/folders/edit
 */
export default function foldersEdit(options: MailAPI.FoldersEdit, credentials?: Credentials): RequestResult<string[]> {
	return call('folders/edit', options, 'POST', credentials);
}

export async function foldersEditAsync(
	options: MailAPI.FoldersEdit,
	credentials?: Credentials
): Promise<RequestResult<string[]>> {
	return callAsync('folders/edit', options, 'POST', credentials);
}
