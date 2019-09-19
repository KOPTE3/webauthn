import { Credentials, RequestResult } from '../../../types/api';
import { CredentialsCreateResponseOptions, PlatformType } from '../../../types/webauthn';
import call, { callAsync } from '../call';
import config from '../../../config';

/**
 * @see https://apidoc.devmail.ru/auth.mail.ru/webauthn/credentials/create/confirm/
 */

interface ReqParams {
	platform_type: PlatformType;
	[k: string]: any;
}

export interface CredentialsCreateBody {
	session_id: string;
	options: CredentialsCreateResponseOptions;
}

export default function credentialsCreate(
	params: ReqParams,
	credentials?: Credentials
): RequestResult<CredentialsCreateBody> {
	return call('webauthn/credentials/create', params, 'POST', credentials, {
		host: config.api.webAuthmUrl
	});
}

export async function credentialsCreateAsync(
	params: ReqParams,
	credentials?: Credentials
): Promise<RequestResult<CredentialsCreateBody>> {
	return callAsync('webauthn/credentials/create', params, 'POST', credentials, {
		host: config.api.webAuthmUrl
	});
}
