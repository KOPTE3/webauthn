import { Credentials, RequestResult } from '../../../types/api';
import call, { callAsync } from '../call';

/**
 * @see https://apidoc.devmail.ru/auth.mail.ru/webauthn/credentials/create/confirm/
 */

interface Params {

}

interface CredentialsConfirmBody {

}

const defaultParams = {
	platform_type: 'cross-platform'
};

export default function credentialsConfirm(
	params: Params = defaultParams,
	credentials?: Credentials
): RequestResult<CredentialsConfirmBody> {
	return call('webauthn/credentials/create/confirm', params, 'POST', credentials, {
		host: browser.options.baseUrl
	});
}

export async function credentialsConfirmAsync(
	params: Params = defaultParams,
	credentials?: Credentials
): Promise<RequestResult<CredentialsConfirmBody>> {
	return callAsync('webauthn/credentials/create/confirm', params, 'POST', credentials, {
		host: browser.options.baseUrl
	});
}
