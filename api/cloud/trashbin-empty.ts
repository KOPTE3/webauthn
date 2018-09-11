import { Credentials, RequestResult } from '../../types/api';
import call, { callAsync } from './call';

/**
 * @see http://docs.i.munkin.devmail.ru/cloud-api/master/_docs/trashbin.html
 */
export default function trashbinEmpty(
	options: object = {},
	credentials?: Credentials
): RequestResult<{}> {
	return call('trashbin/empty', options, 'POST', credentials);
}

export async function trashbinEmptyAsync(
	options: object = {},
	credentials?: Credentials
): Promise<RequestResult<{}>> {
	return callAsync('trashbin/empty', options, 'POST', credentials);
}
