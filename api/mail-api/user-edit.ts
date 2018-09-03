import { MailAPI } from '@qa/api';
import { RequestResult } from '../../types/api';
import call, { callAsync } from './call';

/**
 * @see http://api.tornado.dev.mail.ru/user/edit
 */
export default function userShort (options: MailAPI.UserEdit): RequestResult<void> {
	return call('user/edit', options);
}

export async function userShortAsync (options: MailAPI.UserEdit): Promise<RequestResult<void>> {
	return callAsync('user/edit', options);
}
