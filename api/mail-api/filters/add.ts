import { MailAPI } from '@qa/api';
import { Credentials, RequestResult } from '../../../types/api';
import call, { callAsync } from '../call';

/**
 * @see https://apidoc.devmail.ru/e.mail.ru/filters/add/
 */
export default function filtersAdd(options: MailAPI.FiltersAdd, credentials?: Credentials): RequestResult<string[]> {
	return call('filters/add', options, 'POST', credentials);
}

export async function filtersAddAsync(
	options: MailAPI.FiltersAdd,
	credentials?: Credentials
): Promise<RequestResult<string[]>> {
	return callAsync('filters/add', options, 'POST', credentials);
}
