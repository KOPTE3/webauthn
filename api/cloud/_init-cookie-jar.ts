import * as request from 'request';
import * as rp from 'request-promise-native';
import { Credentials } from '../../types/api';
import config from '../../config';
import * as Debug from 'debug';

const debug = Debug('@qa:yoda:cloud-api');

const defaultRequestOptions: Partial<rp.Options> = {
	resolveWithFullResponse: true,
	simple: false,
	json: true
};

/**
 * Функция авторизуется аккаунтом с переданными credentials, в результате чего в cookie jar попадают авторизационная
 * кука Mpop (домен .mail.ru), кука ssdc (домен .auth.mail.ru) и др.
 *
 * @see https://confluence.mail.ru/pages/viewpage.action?pageId=33883210
 *
 * @param {request.CookieJar} cookieJar
 * @param {Credentials} credentials
 */
async function getAuthCookies(cookieJar: request.CookieJar, credentials: Credentials): Promise<void> {
	const { username, password } = credentials;
	const [login, domain]: string[] = username.split('@');

	const response = await rp({
		...defaultRequestOptions,
		url: `${config.api.authBaseUrl}/cgi-bin/auth`,
		method: 'POST',
		formData: {
			Login: login,
			Domain: domain,
			Password: password
		},
		jar: cookieJar
	});

	if (response.statusCode >= 200 && response.statusCode < 400) {
		debug('Successfully obtained Mpop and ssdc cookies');
	} else {
		throw new Error(`${response.request.url} returned error (status code ${response.statusCode}): \
		${JSON.stringify(response.body.body)}`);
	}
}

/**
 * Функция получающая доменную sdcs-куку (в данном случае для домена .cloud.mail.ru) и кладущая её в cookie jar
 * Для осуществления запроса необходимы Mpop- и ssdc-куки, получаемые при помощи функции
 * @see getAuthCookies
 *
 * @param {request.CookieJar} cookieJar
 */
async function getSdcsCookie(cookieJar: request.CookieJar): Promise<void> {
	const response = await rp({
		...defaultRequestOptions,
		url: `${config.api.authBaseUrl}/sdc`,
		method: 'HEAD',
		qs: {
			from: 'https://cloud.mail.ru/home/'
		},
		jar: cookieJar
	});

	if (response.statusCode >= 200 && response.statusCode < 400) {
		debug('Successfully obtained sdcs cookie');
	} else {
		throw new Error(`${response.request.url} returned error (status code ${response.statusCode}): \
		${JSON.stringify(response.body.body)}`);
	}
}

/**
 * Функция, инициализирующая переданный cookie jar необходимыми куками и возвращающая уже модифицированный cookie jar
 *
 * @param {request.CookieJar} cookieJar
 * @param {Credentials} credentials
 * @return {Promise<request.CookieJar>}
 */
export default async function initCookieJar(
	cookieJar: request.CookieJar,
	credentials: Credentials
): Promise<request.CookieJar> {
	await getAuthCookies(cookieJar, credentials);
	await getSdcsCookie(cookieJar);

	return cookieJar;
}
