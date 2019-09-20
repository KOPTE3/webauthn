import { MailAPI } from '@qa/api';
import { Credentials, RequestResult } from '../../../types/api';
import call, { callAsync } from '../call';

export interface Sign {
	sign: string;
	sign_html: string;
	name: string;
	active: boolean;
}

export interface UserShortResponseBody {
	signs: Sign[];
	[key: string]: any;
}

/**
 * @see https://apidoc.devmail.ru/e.mail.ru/user/short
 */
export default function userShort(
	options: MailAPI.UserShort,
	credentials?: Credentials
): RequestResult<UserShortResponseBody> {
	return call('user/short', options, 'GET', credentials);
}

export async function userShortAsync(
	options: MailAPI.UserShort,
	credentials?: Credentials
): Promise<RequestResult<UserShortResponseBody>> {
	return callAsync('user/short', options, 'GET', credentials);
}
