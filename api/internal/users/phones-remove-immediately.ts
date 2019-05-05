import { RequestResult } from '../../../types/api';
import call, { callAsync } from '../call';

interface Options {
	email: string;
	id: string;
}

/**
 * @see http://api.tornado.dev.mail.ru/users/phones/remove/immediately
 */
export default function usersPhonesRemoveImmediately(options: Options): RequestResult<string[]> {
	return call('users/phones/remove/immediately', options, 'POST');
}

export async function usersPhonesRemoveImmediatelyAsync(options: Options): Promise<RequestResult<string[]>> {
	return callAsync('users/phones/remove/immediately', options, 'POST');
}
