import { RequestResult } from '../../../types/api';
import call, { callAsync } from '../call';

export interface Options {
	email: string;
	id: string;
}

/**
 * @see http://api.tornado.dev.mail.ru/users/phones/remove
 */
export default function usersPhonesRemove(options: Options): RequestResult<string[]> {
	return call('users/phones/remove', options, 'POST');
}

export async function usersPhonesRemoveAsync(options: Options): Promise<RequestResult<string[]>> {
	return callAsync('users/phones/remove', options, 'POST');
}
