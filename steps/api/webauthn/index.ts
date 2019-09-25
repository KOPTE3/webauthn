import { assertDefinedValue } from '../../../utils/assert-defined';
import { PlatformType, KeyFullInfo } from '../../../types/webauthn';
import * as MailApi from '../../../api/mail-api';
import { CreateAttestationForCredentialsCreateConfirm } from '../../../utils/webauthn';
import WebAuthnMocks from './mocks';
import { CommonAccount } from '../../../utils/authorization';

export default class WebAuthnSteps {
	@step('Добавить ящику {credentials.email} ключ {name} типа {__result__.keyType}')
	static AddWebauthnKey(name: string, platformType: PlatformType, credentials: CommonAccount) {
		const { body } = MailApi.webauthnCredentialsCreate({
			platform_type: platformType
		}, credentials);

		const { session_id, options } = assertDefinedValue(body);
		const { attestation, privateKey } = browser.waitForPromise(
			CreateAttestationForCredentialsCreateConfirm(options)
		);

		const confirmParams = {
			email: credentials.email,
			session_id,
			attestation,
			name
		};

		MailApi.webauthnCredentialsCreateConfirm(
			confirmParams,
			credentials
		);

		const keyType = platformType === 'platform' ? 'Отпечаток' : 'Внешнее устройство';

		return {
			privateKey,
			credentialIdString: attestation.id,
			keyType
		};
	}

	@step('Удалить все ключи у ящика {credentials.email}, если есть')
	static RevokeAllKeys(credentials: CommonAccount) {
		const { email, password } = credentials;
		const { body: { list } } = MailApi.webauthnCredentialsList({
			email
		}, credentials);

		if (!list) {
			return;
		}

		list.forEach((key: KeyFullInfo) => {
			MailApi.webauthnCredentialsRevoke({
				id: key.id,
				email,
				password
			}, credentials);
		});
	}
}

export {
	WebAuthnMocks
};
