import { MailAPI } from '@qa/api';
import { Credentials, RequestResult } from '../../types/api';
import call, { callAsync } from './call';

/**
 * @see http://api.tornado.dev.mail.ru/user/edit
 */
export default function userEdit(options: MailAPI.UserEdit, credentials?: Credentials): RequestResult<void> {
	return call('user/edit', options, 'POST', credentials);
}

export async function userEditAsync(options: MailAPI.UserEdit, credentials?: Credentials): Promise<RequestResult<void>> {
	return callAsync('user/edit', options, 'POST', credentials);
}
