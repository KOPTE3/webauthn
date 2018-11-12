import { RequestResult } from '../../../types/api';
import call, { callAsync } from '../call';

interface Options {
	password: string;
	redirect_uri?: string;
	md5?: boolean;
}

/**
 * @see http://api.tornado.dev.mail.ru/user/password/change (смотри секцию serverside)
 */
export default function userPasswordChange(options: Options): RequestResult<string> {
	return call('user/password/change', options);
}

export async function userPasswordChangeAsync(options: Options): Promise<RequestResult<string>> {
	return callAsync('user/password/change', options);
}
