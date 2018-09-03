import { MailAPI } from '@qa/api';
import { RequestResult } from '../../types/api';
import call, { callAsync } from './call';

export interface UserShortResponseBody {
	signs: Array<{
		sign: string;
		sign_html: string;
		name: string;
		active: boolean;
	}>

	[key: string]: any;
}

/**
 * @see http://api.tornado.dev.mail.ru/user/short
 */
export default function userShort (options: MailAPI.UserShort): RequestResult<UserShortResponseBody> {
	return call('user/short', options);
}

export async function userShortAsync (options: MailAPI.UserShort): Promise<RequestResult<UserShortResponseBody>> {
	return callAsync('user/short', options);
}
