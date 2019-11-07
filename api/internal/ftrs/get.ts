import { RequestResult } from '../../../types/api';
import call, { callAsync, CallOptions } from '../call';

export interface FtrsCookieBody {
	body: string;
}

/**
 * @see https://apidoc.devmail.ru/e.mail.ru/test/ftrs/get
 */
export default function getFtrsCookie(): RequestResult<FtrsCookieBody> {
	return call('/test/ftrs/get', {}, 'GET');
}

export async function getFtrsCookieAsync(): Promise<RequestResult<FtrsCookieBody>> {
	return callAsync('/test/ftrs/get', {}, 'GET');
}
