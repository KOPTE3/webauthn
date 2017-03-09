import * as Debug from 'debug';
import AccountManager, { Credentials, RegisterOptions } from '@qa/account-manager';
import authStore from '../store/authorization';
import providers from '../store/authorization/providers';
import URL from './url';

let debug = Debug('@qa:yoda');
const TIMEOUT: number = 30 * 1000;

/** Набор методов для аккаунтом пользователя */
/** @namespace browser */
export default {
	/**
	 * Получение сессии
	 *
	 * @param {string} type — тип авторизации
	 * @param {Object} [options] — авторизационые данные
	 * @returns {boolean}
	 */
	session (type: string = 'basic', options: Credentials = {}): boolean {
		let account = AccountManager.Hooks(),
			service = 'mail.ru';

		if (/^(pdd|external)$/.test(type)) {
			type = 'basic';
		} else if (options.username) {
			let { name, host } = this.parseEmail(options.username);

			service = providers.find(host).name || host;
		}

		// Ставим куку только на хост, который указан в конфиге
		let host = browser.options.baseUrl;

		// Добавляем обязательные поля
		Object.assign(options, { host, type, service });

		browser.waitForPromise(() => {
			return account.session(options);
		}, TIMEOUT, 'Could not get user session');

		this.setCookie();

		return true;
	},

	/**
	 * Регистрация нового ящика
	 *
	 * @param {string} [type] — тип авторизации
	 * Из-за отсутствия других реализаций пока не используется, но зарезервирован
	 * @param {Object} [options] — авторизационые данные
	 * @returns {AccountManager.Credentials}
	 */
	register (type?: string, options: RegisterOptions = {}): Credentials {
		let account = AccountManager.Hooks();

		return browser.waitForPromise(() => {
			return account.register(options.domain || 'mail.ru', options);
		}, TIMEOUT, 'Could not register user');
	},

	/**
	 * Выставляет куки
	 */
	setCookie (): void {
		let { account } = authStore;

		URL.open('/cgi-bin/lstatic', TIMEOUT);

		// Удостоверямся, что документ доступен
		browser.waitForExist('body');

		try {
			let cookie = account.get('cookie');

			if (!cookie.length) {
				throw new Error('The required cookie could not be found');
			}

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
	logout (email: string = '', timeout: number = TIMEOUT): void {
		if (!email) {
			let { account } = authStore;

			email = account.get('email');
		}

		// В почте разлогинизация для активного пользователя
		// происходит без ajax запроса, открытием url в браузере,
		// а для неактивного с помощью ajax — повторяем это поведение
		if (this.isActiveUser(email)) {
			browser.url('https://auth.mail.ru/cgi-bin/logout');
		} else {
			try {
				browser.timeouts('script', timeout);

				let {value} = browser.executeAsync(function (user: string, resolve) {
					if (window.__PH && window.__PH.logoutAccount) {
						window.__PH.logoutAccount(user, function (result) {
							resolve(result.status === 'ok');
						});
					}
				}, email);
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
	isActiveUser (email: string = '', timeout: number = TIMEOUT): boolean {
		if (!email) {
			let { account } = authStore;

			email = account.get('email');
		}

		return browser.waitUntil(() => {
				let {value} = browser.execute((user: string) => {
					return window.__PH && window.__PH.activeUser() === user;
				}, email);

				return value;
			},
			timeout, `Could not detect user authorization ${email}`);
	},

	/**
	 * Позволяет определить тип аккаунта
	 *
	 * @param {string} provider
	 * @param {string} type
	 * Допустимые значения: [internal, external, pdd, oauth]
	 * @returns {boolean}
	 */
	hasAccountType (provider: string, type: string): boolean {
		let result = providers.list.filter(({ hosts, types }) => {
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
	parseEmail (email: string): { name: string; host: string } {
		try {
			let [, name, host] = email.match(/(.*)@(.{4,})$/);

			return { name, host };
		} catch (error) {
			throw new Error(`Could not parse passed email "${email}"\n${error.stack}`);
		}
	}
};
