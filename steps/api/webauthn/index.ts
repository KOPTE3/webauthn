import * as MailApi from '../../../api/mail-api';
import { assertDefinedValue } from '../../../utils/assert-defined';
import WebAuthnMocks from './mocks';

export default class WebAuthnSteps {
	@step('Вызвать метод webauthn/credentials/create')
	credentialsCreate(): void {
		const { body } = MailApi.credentialsCreate();

		const { session_id, options } = assertDefinedValue(body);
		// todo
	}
}

export {
	WebAuthnMocks
};
