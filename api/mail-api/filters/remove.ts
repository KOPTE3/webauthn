import { MailAPI } from '@qa/api';
import { Credentials, RequestResult } from '../../../types/api';
import call, { callAsync } from '../call';

/**
 * @see https://apidoc.devmail.ru/e.mail.ru/filters/remove/
 */
export default function filtersRemove(
	options: MailAPI.FiltersRemove, credentials?: Credentials
): RequestResult<string[]> {
	return call('filters/remove', options, 'POST', credentials);
}

export async function filtersRemoveAsync(
	options: MailAPI.FiltersRemove,
	credentials?: Credentials
): Promise<RequestResult<string[]>> {
	return callAsync('filters/remove', options, 'POST', credentials);
}
