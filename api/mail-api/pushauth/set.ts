import { Credentials, RequestResult } from '../../../types/api';
import call, { callAsync } from '../call';
import config from '../../../config';

/**
 * @see https://apidoc.devmail.ru/auth.mail.ru/webauthn/credentials/create/confirm/
 */

interface ReqParams {
	login: string;
	method: string;
}

export interface SetBody {
	method: string;
}

export default function pushauthMethodSet(
	params: ReqParams,
	credentials?: Credentials
): RequestResult<SetBody> {
	return call('pushauth/method/set', params, 'POST', credentials, {
		host: config.api.accountBaseUrl
	});
}

export async function pushauthMethodSetAsync(
	params: ReqParams,
	credentials?: Credentials
): Promise<RequestResult<SetBody>> {
	return callAsync('pushauth/method/set', params, 'POST', credentials, {
		host: config.api.accountBaseUrl
	});
}
