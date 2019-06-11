import { MailAPI } from '@qa/api';
import { Credentials, RequestResult } from '../../../../types/api';
import call, { callAsync } from '../../call';

/**
 * @see http://api.tornado.dev.mail.ru/ab/labels/edit/
 */
export default function labelsEdit(
	options: MailAPI.FiltersAdd,
	credentials?: Credentials
): RequestResult<string[]> {
	return call('ab/labels/edit', options, 'POST', credentials);
}

export async function labelsEditAsync(
	options: MailAPI.FiltersAdd,
	credentials?: Credentials
): Promise<RequestResult<string[]>> {
	return callAsync('ab/labels/edit', options, 'POST', credentials);
}
