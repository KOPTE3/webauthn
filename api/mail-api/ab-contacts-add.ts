import { MailAPI } from '@qa/api';
import { Credentials, RequestResult } from '../../types/api';
import call, { callAsync } from './call';

/**
 * @see http://api.tornado.dev.mail.ru/ab/contacts/add
 */
export default function abContactsAdd(
	options: MailAPI.AbContactsAdd,
	credentials?: Credentials
): RequestResult<Array<string>> {
	return call('ab/contacts/add', options, 'POST', credentials);
}

export async function abContactsAddAsync(
	options: MailAPI.AbContactsAdd,
	credentials?: Credentials
): Promise<RequestResult<Array<string>>> {
	return callAsync('ab/contacts/add', options, 'POST', credentials);
}
