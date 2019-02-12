import { RequestResult } from '../../../types/api';
import call, { callAsync } from '../call';
import { CookieJar } from 'request';

interface Params {
	email: string;
	time: number;
}

interface Options {
	jar: CookieJar;
}

export interface CreationTimeBody {
	body: string;
}

/**
 * @see http://api.tornado.dev.mail.ru/test/session/creation_time
 */
export default function creationTime(params: Params, opts: Options): RequestResult<CreationTimeBody> {
	return call('test/session/creation_time', params, 'POST', opts);
}

export async function creationTimeAsync(params: Params, opts: Options): Promise<RequestResult<CreationTimeBody>> {
	return callAsync('test/session/creation_time', params, 'POST', opts);
}
