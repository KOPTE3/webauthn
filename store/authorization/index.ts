import * as Debug from 'debug';
import AccountManager, { Credentials } from '@qa/account-manager';
import User from '@qa/account-manager/utils/user';

let debug = Debug('@qa:yoda');
let account = new AccountManager();

/**
 * Набор методов для работы с авторизационными данными
 * @global
 * @module "@qa/yoda/store/authorization"
 */
export default {
	/** Пароль, который следует использовать */
	password: User.password,

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
		return browser.waitForPromise(async () => {
			let { body } = await account.credentials({ domain: 'mail.ru', type, ...options });

			debug('Used credentials:\n%o', body);

			return body;
		}, timeout, 'Could not get user credentials');
	},

	/**
	 * Освободить и сбросить состояние аккаунта
	 *
	 * @param {number} id — идентификатор учетной записи
	 * @returns {Promise}
	 */
	discard (id: number): Promise<void> {
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
