import { Credentials, RequestResult } from '../../../types/api';
import call, { callAsync } from '../call';
import config from '../../../config';

/**
 * @see https://apidoc.devmail.ru/auth.mail.ru/webauthn/credentials/get/confirm/
 */

export default function credentialsGetConfirm(
	params: any,
	credentials?: Credentials
): RequestResult<any> {
	return call('webauthn/credentials/get/confirm', {}, 'POST', credentials, {
		host: config.api.webAuthmUrl,
		json: params,
		clearJar: true
	});
}

export async function credentialsGetConfirmAsync(
	params: any,
	credentials?: Credentials
): Promise<RequestResult<any>> {
	return callAsync('webauthn/credentials/get/confirm', {}, 'POST', credentials, {
		host: config.api.webAuthmUrl,
		json: params,
		clearJar: true
	});
}
