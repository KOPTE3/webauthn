import * as Debug from 'debug';
import * as assert from 'assert';
import { CookieJar } from 'request';
import * as rp from 'request-promise-native';
import { Cookie } from 'tough-cookie';
import config from '../config';
import URL from './url';
import { creationTime } from '../api/internal/session/index';

const debug = Debug('@qa:yoda');
const jar = rp.jar();
const ids: number[] = [];
const TIMEOUT: number = 30 * 1000;

let session: Session = null;

export type Type = 'regular' | 'external' | 'pdd';

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

export async function getCredentialsAsync(
	type: Type = 'regular',
	options: Partial<CommonAccount> = null
): Promise<ASAccount> {
	debug(`Запрашиваем аккаунт с типом ${type}`, (options ? options : ''));

	options = options || {};

	const qs = { ...options, type };

	const response: ASAccount = await rp.get(`${config.as.url}/get`, {
		json: true,
		auth: config.as.auth,
		qs
	});

	response.username = response.email;

	debug('Получили аккаунт:\n%o', response);
	ids.push(response.id);

	return response;
}

export function getCredentials(
	type: Type = 'regular',
	options: Partial<CommonAccount> = null, timeout?: number
): ASAccount {
	return browser.waitForPromise(getCredentialsAsync(type, options), timeout, 'Could not get user credentials');
}

export async function loginAccountAsync(credentials: CommonAccount): Promise<Session> {
	const res1 = await rp({
		method: 'POST',
		uri: config.auth.login,
		headers: {
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
		jar,
		simple: false,
		resolveWithFullResponse: true
	});

	const res2 = await rp({
		method: 'GET',
		uri: config.auth.sdc,
		headers: {
			'User-Agent': config.auth.ua
		},
		followAllRedirects: false,
		jar,
		simple: false,
		resolveWithFullResponse: true
	});

	const cookies: Cookie[] = jar.getCookies(config.auth.login) as any;

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

export async function loadNaviDataAsync(jar: CookieJar): Promise<NaviData> {
	const response = await rp({
		method: 'GET',
		uri: config.auth.NaviData,
		headers: {
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

function parseAccount(email: string, password: string): CommonAccount {
	const [login, domain] = email.split('@');

	return {
		email,
		password,
		login,
		domain,
		username: email
	};
}

export default class Authorization {
	static auth(type?: Type, select?: Partial<CommonAccount>): CommonAccount;
	static auth(email: string, password: string): CommonAccount;
	static auth(credentials: AccountCredentials): CommonAccount;
	@step('Авторизуемся аккаунтом {__result__.username}')
	static auth(arg0?: any, arg1?: any): CommonAccount {
		let authCredentials: CommonAccount = null;

		if (typeof arg0 === 'undefined' || ['regular', 'external', 'pdd'].includes(arg0)) {
			const type: Type = arg0;

			authCredentials = getCredentials(type, arg1);
		} else {
			if (typeof arg0 === 'string' && typeof arg1 === 'string') {
				authCredentials = parseAccount(arg0, arg1);
			} else if (arg0 && typeof arg0 === 'object') {
				const { email, password } = arg0 as AccountCredentials;
				authCredentials = parseAccount(email, password);
			}
		}

		const session = loginAccount(authCredentials);

		URL.open(config.auth.supix, TIMEOUT);

		// Удостоверямся, что документ доступен
		browser.waitForExist('body');

		const cookies: WebdriverIO.Cookie[] = session.cookies.map((cookie: Cookie): WebdriverIO.Cookie => {
			return {
				name: cookie.key,
				value: cookie.value,
				domain: `.${cookie.domain}`
			};
		});

		cookies.push({
			name: 'qa',
			value: config.cookies.qa,
			domain: '.mail.ru'
		});

		browser.setCookies(cookies);

		return authCredentials;
	}

	static loadNaviData(): NaviData {
		browser.newWindow(config.auth.supix, 'supix', '');

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

		for (const c of cookies) {
			const cookie = new Cookie({
				key: c.name,
				value: c.value,
				domain: 'portal.mail.ru'
			});

			// не придумал как подругому
			// @ts-ignore
			jar.setCookie(cookie, 'https://portal.mail.ru/NaviData');
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
	static async makeSessionOld(): Promise<string | object> {
		const naviData = Authorization.loadNaviData();

		// получаем все куки
		const cookies: Cookie[] = (jar as any)._jar.toJSON().cookies;
		const requestJar = rp.jar();

		for (const c of cookies) {
			if (c.key === 'sdcs' || c.key === 'Mpop') {
				c.domain = 'mail.ru';
				// @ts-ignore
				requestJar.setCookie(Cookie.fromJSON(c), config.api.internalApiBaseUrl);
			}
		}

		const response = creationTime({
			email: naviData.data.email,
			time: 1500000000
		},                            {
			jar: requestJar
		});
		assert.strictEqual(response.body, '', 'Failed to set creation_time to session. Check SDCS and Mpop cookies are set.');
		return response.body;
	}
}
