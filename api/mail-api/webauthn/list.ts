import { Credentials, RequestResult } from '../../../types/api';
import call, { callAsync } from '../call';
import config from '../../../config';

interface ReqParams {
	email: string;
}

/**
 * @see https://apidoc.devmail.ru/auth.mail.ru/webauthn/credentials/list/
 */

export default function webauthnCredentialsList(
	params: ReqParams,
	credentials?: Credentials
): RequestResult<any> {
	return call('webauthn/credentials/list', params, 'POST', credentials, {
		host: config.api.accountBaseUrl
	});
}

export async function webauthnCredentialsListAsync(
	params: ReqParams,
	credentials?: Credentials
): Promise<RequestResult<any>> {
	return callAsync('webauthn/credentials/list', params, 'POST', credentials, {
		host: config.api.accountBaseUrl
	});
}
