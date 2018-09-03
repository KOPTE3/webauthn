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
	options.force = 1; //  принудительно вернуть список писем, даже если в ящике не было изменений
	return call('user/short', options);
}

export async function userShortAsync (options: MailAPI.UserShort): Promise<RequestResult<UserShortResponseBody>> {
	options.force = 1;
	return callAsync('user/short', options);
}
