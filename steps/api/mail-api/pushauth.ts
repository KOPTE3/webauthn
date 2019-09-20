import * as MailApi from '../../../api/mail-api';
import { CommonAccount } from '../../../utils/authorization';

export default class PushauthSteps {
	/**
	 * Работает только для .mail.ru ящиков
	 */
	@step('Включить ящику вход по {method === "sms" ? "коду" : "паролю" } ')
	static SetPushauthMethod(method: string, credentials: CommonAccount) {
		MailApi.pushauthMethodSet({
			method, login: credentials.email
		}, credentials);
	}
}
