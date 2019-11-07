import { RequestResult } from '../../../types/api';
import call, { callAsync, CallOptions } from '../call';

export interface FtrsCookieBody {
	expiration: number;
	value: string;
}

/**
 * @see https://apidoc.devmail.ru/e.mail.ru/test/ftrs/get
 */
export default function getFtrsCookie(): RequestResult<FtrsCookieBody> {
	return call('/golang/test/ftrs/get', {}, 'GET');
}

export async function getFtrsCookieAsync(): Promise<RequestResult<FtrsCookieBody>> {
	return callAsync('/golang/test/ftrs/get', {}, 'GET');
}
