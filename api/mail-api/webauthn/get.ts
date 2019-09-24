import { Credentials, RequestResult } from '../../../types/api';
import call, { callAsync } from '../call';
import config from '../../../config';

interface ReqParams {
	email: string;
}

/**
 * @see https://apidoc.devmail.ru/auth.mail.ru/webauthn/credentials/get/
 */

export default function webauthnCredentialsGet(
	params: ReqParams,
	credentials?: Credentials
): RequestResult<any> {
	return call('webauthn/credentials/get', params, 'POST', credentials, {
		host: config.api.accountBaseUrl,
		clearJar: true
	});
}

export async function webauthnCredentialsGetAsync(
	params: ReqParams,
	credentials?: Credentials
): Promise<RequestResult<any>> {
	return callAsync('webauthn/credentials/get', params, 'POST', credentials, {
		host: config.api.accountBaseUrl,
		clearJar: true
	});
}
