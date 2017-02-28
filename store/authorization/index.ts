import * as Debug from 'debug';
import AccountManager, { Credentials } from '@qa/account-manager';
import { password } from '@qa/account-manager/utils/user';

let debug = Debug('@qa:yoda');
let account = new AccountManager();

/**
 * Набор методов для работы с авторизационными данными
 * @global
 * @module "@qa/yoda/store/authorization"
 */
export default {
	/** Пароль, который следует использовать */
	password,

	/**
	 * Возвращает авторизационные данные указанного типа
	 *
	 * @see discard — обязательно вызываейте этот метод для осовобождения
	 * занимаемого аккаунта!
	 * @param {"basic" | "external" | "pdd"} type — тип авторизации
	 * @param {AccountManager.Credentials} [options] — дополнительные опции
	 * @param {number} [timeout] — максимальное время ожидания
	 * @returns {AccountManager.Credentials}
	 *
	 * Данные, которые возвращаются:
	 *
	 * {
	 *    id, login, password, domain, first_name,
	 *    user_agent, sex, last_name
	 * }
	 */
	credentials (type: string = 'basic', options: Credentials = {}, timeout?: number): Credentials {
		options = Object.assign({ domain: 'mail.ru', type }, options);

		return browser.waitForPromise(() => {
			return account.credentials(options)
				.then(({ body }) => {
					debug('Used credentials:\n%o', body);

					return body;
				})
				.catch(({ message }) => {
					throw new Error(`Could not get user credentials:\n\t${message}`);
				});
		}, timeout, 'Could not get user credentials');
	},

	/**
	 * Освободить и сбросить состояние аккаунта
	 *
	 * @param {number} id — идентификатор учетной записи
	 * @returns {Promise}
	 */
	discard<T> (id: number): Promise<T> {
		return account.discard(id);
	},

	/**
	 * Получение авторизационных сведений о текущем аккаунте
	 *
	 * @type {AccountManager.Session}
	 */
	get account (): AccountManager.Session {
		return AccountManager.Session();
	}
};
