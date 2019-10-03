import * as assert from 'assert';
import * as Debug from 'debug';
import { CookieJar } from 'request';
import * as rp from 'request-promise-native';
import { Cookie } from 'tough-cookie';
import { creationTime } from '../api/internal/session/index';
import config from '../config';
import URL from './url';
import { assertDefinedValue } from './assert-defined';

export type Type = 'regular' | 'external' | 'pdd';

export interface EmailType {
	emailType: string | 'test_login';
}

export interface AccountCredentials {
	email: string;
	password: string;
}

export interface CommonAccount extends AccountCredentials {
	login: string;
	domain: string;
	username: string;
}

export interface ASAccount extends CommonAccount {
	id: number;
	domain_id: number;
	firstname: string;
	lastname: string;
	gender: 'male' | 'female';
	type: Type;

	lang?: string;
	sex?: string;
	user_agent?: string;
	name?: {
		first?: string;
		last?: string;
	};
	birthday?: {
		day?: number;
		month?: number;
		year?: number;
	};
	restore_settings?: {
		secret?: string;
		secret_answer?: string;
		emails?: Array<{email: string; transfer?: boolean}>;
	};

	[key: string]: any;
}

export interface Session {
	credentials: CommonAccount;
	cookies: Cookie[];
}

const debug = Debug('@qa:yoda:auth');
const jar = rp.jar();
const ids: number[] = [];

let session: Session;

function getSupixUrl() {
	return `${config.auth.supix}?_=${Math.random()}`;
}

/**
 * Получает из аккаунт-сервиса учётку, подходящую под определённые фильтры
 * @param {Type} [type='regular'] - тип аккаунта
 * @param {CommonAccount} [options]
 * @return Promise<ASAccount>
 */
export async function getCredentialsAsync(
	type: Type = 'regular',
	options: Partial<CommonAccount & EmailType> = {}
): Promise<ASAccount> {
	debug(`Запрашиваем аккаунт с типом ${type}`, (options ? options : ''));

	const qs = { ...options, type };

	const accountUrl = options.emailType === 'test_login' ?
		config.as.testLoginUrl :
		config.as.url;

	const response: ASAccount = await rp.get(`${accountUrl}/get`, {
		json: true,
		auth: config.as.auth,
		proxy: config.api.proxyUrl || void 0,
		qs
	});

	response.username = response.email;

	debug('Получили аккаунт:\n%o', response);
	ids.push(response.id);

	return response;
}

export function getCredentials(
	type: Type = 'regular',
	options: Partial<CommonAccount & EmailType> = {}, timeout?: number
): ASAccount {
	return browser.waitForPromise(getCredentialsAsync(type, options), timeout, 'Could not get user credentials');
}

export async function getSdcsCookie({ host, jarVal = jar }: {host?: string, jarVal?: CookieJar} = {}) {
	const uri = host ? 'https://auth.mail.ru/sdc?from=' + encodeURIComponent(host) : config.auth.sdc;

	await rp({
		method: 'GET',
		uri,
		headers: {
			'Referer': host || config.auth.referer,
			'User-Agent': config.auth.ua
		},
		followAllRedirects: false,
		jar: jarVal,
		simple: false,
		resolveWithFullResponse: true
	});
}

export function checkSdcsCookie(cookies: Cookie[]): boolean {
	return cookies.map((cookie) => cookie.toJSON())
		.some((cookie) => cookie.key === 'sdcs');
}

/**
 * Авторизует переданный аккаунт, возвращает объект с авторизационными куками
 * @param {CommonAccount} credentials
 * @param {CookieJar} jarVal
 * @return Promise<Session>
 */
export async function loginAccountAsync(credentials: CommonAccount, jarVal = jar): Promise<Session> {
	await rp({
		method: 'POST',
		uri: config.auth.login,
		headers: {
			'Referer': config.auth.referer,
			'User-Agent': config.auth.ua
		},
		followAllRedirects: false,
		qs: {
			Domain: credentials.domain,
			Login: credentials.login,
			Password: credentials.password,
			autotest: 1,
			mac: 1,
			page: 'https://mail.ru'
		},
		jar: jarVal,
		simple: false,
		resolveWithFullResponse: true
	});

	await getSdcsCookie({ jarVal });

	const cookies: Cookie[] = jarVal.getCookies(config.auth.login) as any;

	session = {
		credentials: { ...credentials },
		cookies: cookies.map((cookie) => cookie.clone()) as any
	};

	return session;
}

export function loginAccount(credentials: CommonAccount, timeout?: number): Session {
	return browser.waitForPromise(
		loginAccountAsync(credentials),
		timeout,
		`Could not login with credentials {${credentials.username},${credentials.password}}`
	);
}

export async function getToken(email: string, host: string, jarVal = jar) {
	const options = {
		method: 'POST',
		uri: `${host}/api/v1/tokens`,
		headers: {
			'Referer': host || config.auth.referer,
			'User-Agent': config.auth.ua
		},
		qs: {
			email
		},
		jar: jarVal,
		simple: true,
		json: true
	};

	const { body } = await rp(options);

	return {
		token: body.token,
		jar: jarVal
	};
}

/**
 * Освобождает аккаунт в аккаунт-сервисе
 * @param {number} id
 */
export async function discardCredentialsAsync(id: number): Promise<void> {
	debug(`Discard account ${id}`);

	await rp.get(`${config.as.url}/discard`, {
		json: true,
		auth: config.as.auth,
		qs: { id }
	});

	debug(`Account ${id} has been discarded`);
}

export function discardCredentials(id: number, timeout?: number): void {
	return browser.waitForPromise(discardCredentialsAsync(id), timeout, 'Could not discard user credentials');
}

export async function discardAllCredentialsAsync(): Promise<void> {
	await Promise.all(ids.map((id) => discardCredentials(id)));
}

export function discardAllCredentials(timeout?: number): void {
	return browser.waitForPromise(discardAllCredentialsAsync(), timeout, 'Could not discard all user credentials');
}

export async function logoutAccountAsync(credentials?: CommonAccount): Promise<void> {
	assert(session, 'No current session');
	const Login = credentials && credentials.email || session && session.credentials.email;

	const response = await rp({
		method: 'GET',
		uri: config.auth.logout,
		headers: {
			'Referer': config.auth.referer,
			'User-Agent': config.auth.ua
		},
		followAllRedirects: false,
		qs: {
			Login,
			autotest: 1,
			mac: 1
		},
		jar,
		simple: false,
		resolveWithFullResponse: true
	});
}

export interface NaviData {
	status: string;
	data: {
		action: string;
		email: string;
		mail_cnt: string;
		my_cnt: string;
		games_cnt: string;
		list: string[];
		ldata: {
			[email: string]: {
				first_name: string;
				last_name: string;
				mail_cnt: number;
				verified: boolean;
			};
		};
	};
}

/**
 * Запрашивает данные NaviData
 * @param {CookieJar} jar
 * @return Promise<NaviData>
 */
export async function loadNaviDataAsync(jar: CookieJar): Promise<NaviData> {
	const response = await rp({
		method: 'GET',
		uri: config.auth.NaviData,
		headers: {
			'Referer': config.auth.referer,
			'User-Agent': config.auth.ua
		},
		followAllRedirects: true,
		qs: {
			Socials: 1,
			ldata: 1,
			mac: 1
		},
		jar,
		json: true
	});

	return response;
}

export function loadNaviData(jar: CookieJar, timeout?: number): NaviData {
	return browser.waitForPromise(loadNaviDataAsync(jar), timeout, 'Could not load NaviData');
}

export function parseAccount(email: string, password: string): CommonAccount {
	const [login, domain] = email.split('@');

	return {
		email,
		password,
		login,
		domain,
		username: email
	};
}

let currentAccount: CommonAccount | undefined | null;

export default class Authorization {
	static auth(type?: Type, select?: Partial<CommonAccount & EmailType>): CommonAccount;
	static auth(email: string, password: string): CommonAccount;
	static auth(credentials: AccountCredentials): CommonAccount;
	@step('Авторизуемся аккаунтом {__result__.username}')
	static auth(arg0?: any, arg1?: any): CommonAccount {
		let authCredentials;

		if (typeof arg0 === 'undefined' || ['regular', 'external', 'pdd'].includes(arg0)) {
			authCredentials = getCredentials(arg0 as Type, arg1);
		} else {
			if (typeof arg0 === 'string' && typeof arg1 === 'string') {
				authCredentials = parseAccount(arg0, arg1);
			} else if (arg0 && typeof arg0 === 'object') {
				const { email, password } = arg0 as AccountCredentials;
				authCredentials = parseAccount(email, password);
			}
		}

		const session = loginAccount(authCredentials as CommonAccount);

		URL.open(getSupixUrl(), config.timeout);

		// Удостоверямся, что документ доступен
		browser.waitForExist('body');

		const cookies: WebdriverIO.Cookie[] = session.cookies.map(({ key, value, domain }: Cookie): WebdriverIO.Cookie => {
			return {
				name: key,
				value,
				domain: `.${domain}`
			};
		});

		cookies.push({
			name: 'qa',
			value: config.cookies.qa,
			domain: '.mail.ru'
		});

		browser.setCookies(cookies);
		browser.pause(300);

		currentAccount = authCredentials;

		return authCredentials as CommonAccount;
	}

	static CurrentAccount(): CommonAccount | undefined | null {
		return currentAccount;
	}

	static loadNaviData(): NaviData {
		browser.newWindow(getSupixUrl(), 'supix', '');

		// Удостоверямся, что документ доступен
		browser.waitForExist('body');
		const cookies: WebdriverIO.Cookie[] = browser.getCookie();

		browser.setCookies([{
			name: 'qa',
			value: config.cookies.qa,
			domain: '.mail.ru'
		}]);

		browser.close();

		const jar = rp.jar();

		for (const { name, value } of cookies) {
			const cookie = new Cookie({
				key: name,
				value,
				domain: 'portal.mail.ru'
			});

			jar.setCookie(cookie.toString(), 'https://portal.mail.ru/NaviData');
		}

		return loadNaviData(jar);
	}

	@step('Проверяем, что текущий авторизованный аккаунт это {email}')
	static checkActiveAccount(email: string): void {
		const naviData = Authorization.loadNaviData();
		assert.strictEqual(naviData.status, 'ok');
		assert.strictEqual(naviData.data.email, email, `Actual account is not ${email}`);
	}

	@step('Сделать сессию старой')
	static makeSessionOld(timestamp?: number): string | object {
		const naviData = Authorization.loadNaviData();

		// получаем все куки
		const cookies: Cookie[] = (jar as any)._jar.toJSON().cookies;
		const requestJar = rp.jar();

		for (const c of cookies) {
			if (c.key === 'sdcs' || c.key === 'Mpop') {
				requestJar.setCookie(
					Cookie.fromJSON({ ...c, domain: 'mail.ru' }) || '', config.api.internalBaseUrl
				);
			}
		}

		const response = creationTime({
			email: naviData.data.email,
			time: timestamp || 1500000000
		}, {
			jar: requestJar
		});

		assert.strictEqual(
			response.status,
			200,
			'Failed to set creation_time to session. Check SDCS and Mpop cookies are set.'
		);

		return assertDefinedValue(response.body);
	}
}
