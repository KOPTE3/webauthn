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

class AuthMenuDropdown extends Element {
	protected locator: string = '.x-ph__menu__dropdown_auth';
	protected name: string = 'Выпадушка порталки со списокм авторизованных аккаунтов';
}

class SignInAnotherLink extends Element {
	public parent: Element = new AuthMenuDropdown();
	protected locator: string = '#PH_loginAnotherLink';
	protected name: string = 'Кнопка "Добавить почтовый ящик" в выпадушке';
}

export default class PortalHeader extends Element {
	protected locator: string = '#portal-headline';
	protected name: string = 'Порталка';

	static UserEmail = UserEmail;
	static LogoutLink = LogoutLink;
	static SignInLink = SignInLink;
	static SignUpLink = SignUpLink;
	static AuthMenuDropdown = AuthMenuDropdown;
	static SignInAnotherLink = SignInAnotherLink;

	@step('Проверяем, что порталка содержит следующий email: {expected}')
	static CheckEmail(expected: string): void {
		PortalHeader.waitForVisible(true);
		const actual = PortalHeader.UserEmail.getTextContent();

		assert.strictEqual(actual, expected);
	}
}
