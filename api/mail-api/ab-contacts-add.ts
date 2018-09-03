import { MailAPI } from '@qa/api';
import { RequestResult } from '../../types/api';
import call, { callAsync } from './call';

/**
 * @see http://api.tornado.dev.mail.ru/ab/contacts/add
 */
export default function abContactsAdd (options: MailAPI.AbContactsAdd): RequestResult<Array<string>> {
	return call('ab/contacts/add', options);
}

export async function abContactsAddAsync (options: MailAPI.AbContactsAdd): Promise<RequestResult<Array<string>>> {
	return callAsync('ab/contacts/add', options);
}
