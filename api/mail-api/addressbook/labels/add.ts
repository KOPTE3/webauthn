import { MailAPI } from '@qa/api';
import { Credentials, RequestResult } from '../../../../types/api';
import call, { callAsync } from '../../call';

/**
 * @see http://api.tornado.dev.mail.ru/ab/labels/add/
 */
export default function labelsAdd(
	options: MailAPI.AbLabelsAdd,
	credentials?: Credentials
): RequestResult<string[]> {
	return call('ab/labels/add', options, 'POST', credentials);
}

export async function labelsAddAsync(
	options: MailAPI.AbLabelsAdd,
	credentials?: Credentials
): Promise<RequestResult<string[]>> {
	return callAsync('ab/labels/add', options, 'POST', credentials);
}
