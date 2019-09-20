import { MailAPI } from '@qa/api';
import { Credentials, RequestResult } from '../../../types/api';
import call, { callAsync } from '../call';

/**
 * @see https://apidoc.devmail.ru/e.mail.ru/collectors/add
 */
export default function collectorsAdd(options: MailAPI.CollectorsAdd, credentials?: Credentials): RequestResult<void> {
	return call('collectors/add', options, 'POST', credentials);
}

export async function collectorsAddAsync(
	options: MailAPI.CollectorsAdd,
	credentials?: Credentials
): Promise<RequestResult<void>> {
	return callAsync('collectors/add', options, 'POST', credentials);
}
