import { MailAPI } from '@qa/api';
import { Credentials, RequestResult } from '../../../../types/api';
import call, { callAsync } from '../../call';

/**
 * @see http://api.tornado.dev.mail.ru/ab/labels/remove/
 */
export default function labelsRemove(
	options: MailAPI.FiltersAdd,
	credentials?: Credentials
): RequestResult<string[]> {
	return call('ab/labels/remove', options, 'POST', credentials);
}

export async function labelsRemoveAsync(
	options: MailAPI.FiltersAdd,
	credentials?: Credentials
): Promise<RequestResult<string[]>> {
	return callAsync('ab/labels/remove', options, 'POST', credentials);
}
