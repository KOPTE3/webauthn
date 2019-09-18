import { Credentials, RequestResult } from '../../../types/api';
import call, { callAsync } from '../call';

/**
 * @see https://apidoc.devmail.ru/auth.mail.ru/webauthn/credentials/create/confirm/
 */

export default function credentialsCreateConfirm(
	params: any,
	credentials?: Credentials
): RequestResult<any> {
	return call('webauthn/credentials/create/confirm', {}, 'POST', credentials, {
		host: 'https://account.test.mail.ru',
		json: params
	});
}

export async function credentialsCreateConfirmAsync(
	params: any,
	credentials?: Credentials
): Promise<RequestResult<any>> {
	return callAsync('webauthn/credentials/create/confirm', {}, 'POST', credentials, {
		host: 'https://account.test.mail.ru',
		json: params
	});
}
