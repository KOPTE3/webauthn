import { Credentials, RequestResult } from '../../../types/api';
import call, { callAsync } from '../call';

/**
 * @see https://apidoc.devmail.ru/e.mail.ru/folders/clear
 */
export default function foldersClear(options: {}, credentials?: Credentials): RequestResult<string[]> {
	return call('folders/clear', options, 'POST', credentials);
}

export async function foldersClearAsync(
	options: {},
	credentials?: Credentials
	): Promise<RequestResult<string[]>> {
	return callAsync('folders/clear', options, 'POST', credentials);
}
