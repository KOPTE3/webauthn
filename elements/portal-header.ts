import * as assert from 'assert';
import Element from '../element';

class UserEmail extends Element {
	protected locator: string = '#PH_user-email';
	protected name: string = 'EMail пользователя в порталке';
}

class LogoutLink extends Element {
	protected locator: string = '#PH_logoutLink';
	protected name: string = 'Ссылка "Выход"';
}

class SignInLink extends Element {
	protected locator: string = '#PH_authLink';
	protected name: string = 'Ссылка "Вход"';
}

class SignUpLink extends Element {
	protected locator: string = '#PH_regLink';
	protected name: string = 'Ссылка "Регистрация"';
}

export default class PortalHeader extends Element {
	protected locator: string = '#portal-headline';
	protected name: string = 'Порталка';

	static UserEmail = UserEmail;
	static LogoutLink = LogoutLink;
	static SignInLink = SignInLink;
	static SignUpLink = SignUpLink;

	@step('Проверяем, что порталка содержит следующий email: {expected}')
	static CheckEmail(expected: string): void {
		PortalHeader.waitForVisible(true);
		const actual = PortalHeader.UserEmail.getTextContent();

		assert.strictEqual(actual, expected);
	}
}
