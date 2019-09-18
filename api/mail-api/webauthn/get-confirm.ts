import { Credentials, RequestResult } from '../../../types/api';
import call, { callAsync } from '../call';

/**
 * @see https://apidoc.devmail.ru/auth.mail.ru/webauthn/credentials/get/confirm/
 */

export default function credentialsGetConfirm(
	params: any,
	credentials?: Credentials
): RequestResult<any> {
	return call('webauthn/credentials/get/confirm', {}, 'POST', credentials, {
		host: 'https://account.test.mail.ru',
		json: params,
		clearJar: true
	});
}

export async function credentialsGetConfirmAsync(
	params: any,
	credentials?: Credentials
): Promise<RequestResult<any>> {
	return callAsync('webauthn/credentials/get/confirm', {}, 'POST', credentials, {
		host: 'https://account.test.mail.ru',
		json: params,
		clearJar: true
	});
}
