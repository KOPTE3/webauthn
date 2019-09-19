import { assertDefinedValue } from '../../../utils/assert-defined';
import { PlatformType } from '../../../types/webauthn';
import * as MailApi from '../../../api/mail-api';
import { CreateAttestationForCredentialsCreateConfirm } from '../../../utils/webauthn';
import WebAuthnMocks from './mocks';
import { CommonAccount } from '../../../utils/authorization';

export default class WebAuthnSteps {
	// tslint:disable-next-line:max-line-length
	@step('Добавить ящику {credentials.email} ключ {name} типа {platformType === "platform" ? "Отпечаток" : "Внешнее устройство"}')
	addWebauthnKey(name: string, platformType: PlatformType, credentials: CommonAccount) {
		const { body } = MailApi.credentialsCreate({
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

		MailApi.credentialsCreateConfirm(
			confirmParams,
			credentials
		);

		return {
			privateKey,
			credentialIdString: attestation.id
		};
	}
}

export {
	WebAuthnMocks
};
