import { RequestResult } from '../../../types/api';
import call, { callAsync } from '../call';

interface Options {
	phone?: string;
	token_id?: string;
	email: string;
}

/**
 * @see https://apidoc.devmail.ru/e.mail.ru/test/user/phone/code
 */
export default function userPhoneCode(options: Options): RequestResult<string> {
	return call('test/user/phone/code', options);
}

export async function userPhoneCodeAsync(options: Options): Promise<RequestResult<string>> {
	return callAsync('test/user/phone/code', options);
}
