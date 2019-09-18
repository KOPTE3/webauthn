import { Credentials, RequestResult } from '../../../types/api';
import call, { callAsync } from '../call';

/**
 * @see https://apidoc.devmail.ru/auth.mail.ru/webauthn/credentials/get/
 */

export default function credentialsGet(
	params: any,
	credentials?: Credentials
): RequestResult<any> {
	return call('webauthn/credentials/get', params, 'POST', credentials, {
		host: 'https://account.test.mail.ru',
		clearJar: true
	});
}

export async function credentialsGetAsync(
	params: any,
	credentials?: Credentials
): Promise<RequestResult<any>> {
	return callAsync('webauthn/credentials/get', params, 'POST', credentials, {
		host: 'https://account.test.mail.ru',
		clearJar: true
	});
}
