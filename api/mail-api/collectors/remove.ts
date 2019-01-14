import { MailAPI } from '@qa/api';
import { Credentials, RequestResult } from '../../../types/api';
import call, { callAsync } from '../call';

/**
 * @see http://api.tornado.dev.mail.ru/collectors/remove
 */
export default function collectorsRemove(
	options: MailAPI.CollectorsRemove,
	credentials?: Credentials
): RequestResult<void> {
	return call('collectors/remove', options, 'POST', credentials);
}

export async function collectorsRemoveAsync(
	options: MailAPI.CollectorsRemove,
	credentials?: Credentials
): Promise<RequestResult<void>> {
	return callAsync('collectors/remove', options, 'POST', credentials);
}
