import { Credentials, RequestResult } from '../../../types/api';
import call, { callAsync } from '../call';

/**
 * @see https://apidoc.devmail.ru/auth.mail.ru/webauthn/credentials/create/
 */

type AttestationType = 'none' | 'direct' | 'indirect';

interface ReqParams {
	platform_type: string;
	[k: string]: any;
}

export interface RelayingParty {
	id: string;
	name: string;
}

export interface CreatedCredentials {
	challenge: string;
	rp: RelayingParty;
	user: {
		id: string;
		name: string;
		displayName: string;
	};
	attestation: AttestationType;
	authenticatorSelection: {
		authenticatorAttachment: string;
		requireResidentKey: boolean;
	};
	pubKeyCredParams: TemporaryAny[];
	timeout: number;
}

export interface CredentialsCreateBody {
	session_id: string;
	options: {
		publicKey: CreatedCredentials;
	};
}

const defaultParams = {
	platform_type: 'cross-platform'
};

export default function credentialsCreate(
	params: ReqParams = defaultParams,
	credentials?: Credentials
): RequestResult<CredentialsCreateBody> {
	return call('webauthn/credentials/create', params, 'POST', credentials, {
		host: 'https://account.test.mail.ru'
	});
}

export async function credentialsCreateAsync(
	params: ReqParams = defaultParams,
	credentials?: Credentials
): Promise<RequestResult<CredentialsCreateBody>> {
	return callAsync('webauthn/credentials/create', params, 'POST', credentials, {
		host: 'https://account.test.mail.ru'
	});
}
