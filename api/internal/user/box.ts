import { RequestResult } from '../../../types/api';
import call, { callAsync } from '../call';

interface Options {
	email: string;
	limit: number;
}

export interface BoxSizeBody {
	size: number;
	limit: number;
}
/**
 * @see https://apidoc.devmail.ru/e.mail.ru/test/user/box/
 */
export default function userBox(options: Options): RequestResult<BoxSizeBody> {
	return call('test/user/box', options);
}

export async function userBoxAsync(options: Options): Promise<RequestResult<BoxSizeBody>> {
	return callAsync('test/user/box', options);
}
