import { RequestResult } from '../../../types/api';
import call, { callAsync } from '../call';

export interface Options {
	email: string;
	on: boolean;
}

/**
 * @see https://apidoc.devmail.ru/e.mail.ru/test/user/memcached/karma_captcha
 */
export default function memcachedKarmaCaptcha(options: Options): RequestResult<any> {
	return call('test/user/memcached/karma_captcha', options);
}

export async function memcachedKarmaCaptchaAsync(options: Options): Promise<RequestResult<any>> {
	return callAsync('test/user/memcached/karma_captcha', options);
}
