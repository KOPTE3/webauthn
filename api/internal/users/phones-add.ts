import { RequestResult } from '../../../types/api';
import call, { callAsync } from '../call';

export interface Options {
	email: string;
	phones: Array<{
		phone: string;
		mobile: true;
	}>;
	password?: string;
	captcha?: string;
}

/**
 * @see https://apidoc.devmail.ru/e.mail.ru/users/phones/add
 */
export default function usersPhonesAdd(options: Options): RequestResult<string[]> {
	return call('users/phones/add', options, 'POST');
}

export async function usersPhonesAddAsync(options: Options): Promise<RequestResult<string[]>> {
	return callAsync('users/phones/add', options, 'POST');
}
