import { RequestResult } from '../../../types/api';
import call, { callAsync, CallOptions } from '../call';
import { CookieJar } from 'request';

interface Params {
	email: string;
	time: number;
}

export interface CreationTimeBody {
	body: string;
}

/**
 * @see https://apidoc.devmail.ru/e.mail.ru/test/session/creation_time
 */
export default function creationTime(params: Params, opts: CallOptions): RequestResult<CreationTimeBody> {
	return call('test/session/creation_time', params, 'POST', opts);
}

export async function creationTimeAsync(params: Params, opts: CallOptions): Promise<RequestResult<CreationTimeBody>> {
	return callAsync('test/session/creation_time', params, 'POST', opts);
}
