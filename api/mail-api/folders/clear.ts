import { Credentials, RequestResult } from '../../../types/api';
import call, { callAsync } from '../call';

/**
 * @see https://apidoc.devmail.ru/e.mail.ru/folders/clear
 */
export default function foldersClear(ids: string[], credentials?: Credentials): RequestResult<void> {
	return call('folders/clear', ids, 'POST', credentials);
}

export async function foldersClearAsync(
	ids: string[],
	credentials?: Credentials
): Promise<RequestResult<void>> {
	return callAsync('folders/clear', ids, 'POST', credentials);
}
