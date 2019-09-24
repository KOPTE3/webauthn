import { Credentials, RequestResult } from '../../../types/api';
import call, { callAsync } from '../call';
import config from '../../../config';

interface ReqParams {
	email: string;
	password: string;
	id: string;
}

/**
 * @see https://apidoc.devmail.ru/auth.mail.ru/webauthn/credentials/revoke/
 */

export default function webauthnCredentialsRevoke(
	params: ReqParams,
	credentials?: Credentials
): RequestResult<any> {
	return call('webauthn/credentials/revoke', {}, 'POST', credentials, {
		host: config.api.accountBaseUrl,
		json: params
	});
}

export async function webauthnCredentialsRevokeAsync(
	params: ReqParams,
	credentials?: Credentials
): Promise<RequestResult<any>> {
	return callAsync('webauthn/credentials/revoke', {}, 'POST', credentials, {
		host: config.api.accountBaseUrl,
		json: params
	});
}
