import * as Debug from 'debug';
import AccountManager, { Credentials, RegisterOptions } from '@qa/account-manager';
import authorization from '../store/authorization';
import providers from '../store/authorization/providers';
import URL from './url';

const debug = Debug('@qa:yoda');
const TIMEOUT: number = 30 * 1000;

export type UserType = 'basic' | 'pdd' | 'external';

/** Набор методов для аккаунтом пользователя */
/** @namespace browser */
export default {
	/**
	 * Получение сессии
	 *
	 * @param {string} type — тип авторизации
	 * @param {Object} [options] — авторизационые данные
	 * @returns {Credentials}
	 */
	session(type: UserType = 'basic', options: Credentials = {}): Credentials {
		const account = AccountManager.Hooks();
		let service = 'mail.ru';

		if (!/^(pdd|external)$/.test(type)) {
			type = 'basic';
		} else if (options.username) {
			const { name, host } = this.parseEmail(options.username);

			service = providers.find(host).name || host;
		}

		// Получаем куки для домена .mail.ru, для этого указываем host как e.mail.ru
		const { host } = account.options(options);

		const credentials = browser.waitForPromise<Credentials>(
			() => account.session({ ...options, host, type, service }),
			TIMEOUT,
			'Could not get user session'
		);
		// Ставим куки
		this.setCookie();

		return credentials;
	},

	/**
	 * Регистрация нового ящика
	 *
	 * @param {string} [type] — тип авторизации
	 * Из-за отсутствия других реализаций пока не используется, но зарезервирован
	 * @param {Object} [options] — авторизационые данные
	 * @returns {AccountManager.Credentials}
	 */
	register(type?: string, options: RegisterOptions = {}): Credentials {
		const account = AccountManager.Hooks();

		return browser.waitForPromise(() => {
			return account.register(options.domain || 'mail.ru', options);
		},                            TIMEOUT, 'Could not register user');
	},

	/**
	 * Выставляет куки
	 */
	setCookie(): void {
		const { account } = authorization;
		// Ставим куки для проекта, урл которого указан в конфиге как baseUrl
		// на странице, указанной в конфиге как authCookieUrl
		URL.open(browser.options.authCookieUrl || '/cgi-bin/lstatic', TIMEOUT);

		// Удостоверямся, что документ доступен
		browser.waitForExist('body');

		try {
			const cookie = account.get('cookie');

			if (!cookie.length) {
				throw new Error('The required cookie could not be found');
			}

			debug('cookie %j', cookie);

			browser.setCookies(cookie);
		} catch ({ stack, message }) {
			switch (message) {
				case 'COOKIE_NOT_FOUND':
					break;

				default:
					message =
							'Could not found cookie to continue\n\n' +
							'If you see this error message:\n' +
							'  — There\'s no cookie. Try again with --debug option to explore that.\n' +
							'  — The "auth" method is called in the wrong order.\n' +
							'  — There\'s unexpected behavior in using Mocha\'s API.\n' +
							'  — There\'s hidden exception. \n' +
							'Try again with --debug, --stack and --verbose options to explore that.\n';
					break;
			}

			throw new Error(`${message}\n\n${stack}`);
		}
	},

	/**
	 * Разлогин
	 *
	 * @param {string} email
	 * @param {number} timeout
	 */
	logout(email?: string, timeout: number = TIMEOUT): void {
		if (!email) {
			email = authorization.account.get('email');
		}

		// В почте разлогинизация для активного пользователя
		// происходит без ajax запроса, открытием url в браузере,
		// а для неактивного с помощью ajax
		if (this.isActiveUser(email)) {
			browser.url('https://auth.mail.ru/cgi-bin/logout');
		} else {
			try {
				browser.timeouts('script', timeout);

				const { value } = browser.executeAsync(
					(email: string, resolve) => {
						if (window.__PH && window.__PH.logoutAccount) {
							window.__PH.logoutAccount(email, (result) => {
								resolve(result.status === 'ok');
							});
						}
					},
					email
				);
			} catch (error) {
				throw new Error(`Could not logout user ${email}`);
			}
		}
	},

	/**
	 * Проверяет залогинен ли пользователь
	 *
	 * @param {string} [email]
	 * @param {number} [timeout]
	 * @returns {boolean}
	 */
	isActiveUser(email?: string, timeout: number = TIMEOUT): boolean {
		if (!email) {
			const { account } = authorization;

			email = account.get('email');
		}

		const { value } = browser.execute(
			(email: string) => window.__PH && window.__PH.activeUser() === email,
			email
		);

		return !!value;
	},

	/**
	 * Позволяет определить тип аккаунта
	 *
	 * @param {string} provider
	 * @param {string} type
	 * Допустимые значения: [internal, external, pdd, oauth]
	 * @returns {boolean}
	 */
	hasAccountType(provider: string, type: string): boolean {
		const result = providers.list.filter(({ hosts, types }) => {
			return hosts.includes(provider) && types.includes(type);
		});

		return result.length > 0;
	},

	/**
	 * Позволяет получить состовляющие email
	 *
	 * @param {string} email
	 * @returns {Object}
	 */
	parseEmail(email: string): { name: string; host: string } {
		try {
			const [, name, host] = email.match(/(.*)@(.{4,})$/);

			return { name, host };
		} catch (error) {
			throw new Error(`Could not parse passed email "${email}"\n${error.stack}`);
		}
	}
};
