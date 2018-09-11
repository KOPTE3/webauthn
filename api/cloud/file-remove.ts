import { Credentials, RequestResult } from '../../types/api';
import call, { callAsync } from './call';
import { CloudAPI } from '@qa/api';

/**
 * @see http://docs.i.munkin.devmail.ru/cloud-api/master/_docs/file.html
 */
export default function fileRemove(
	options: CloudAPI.FileRemove,
	credentials?: Credentials
): RequestResult<string> {
	return call('file/remove', options, 'POST', credentials);
}

export async function fileRemoveAsync(
	options: CloudAPI.FileRemove,
	credentials?: Credentials
): Promise<RequestResult<string>> {
	return callAsync('file/remove', options, 'POST', credentials);
}
