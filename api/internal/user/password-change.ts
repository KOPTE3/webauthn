import { RequestResult } from '../../../types/api';
import call, { callAsync } from '../call';

export interface Options {
	password: string;
	email: string;
	redirect_uri?: string;
	md5?: boolean;
}

/**
 * @see https://apidoc.devmail.ru/e.mail.ru/user/password/change (смотри секцию serverside)
 */
export default function userPasswordChange(options: Options): RequestResult<string> {
	return call('user/password/change', options, 'POST');
}

export async function userPasswordChangeAsync(options: Options): Promise<RequestResult<string>> {
	return callAsync('user/password/change', options, 'POST');
}
