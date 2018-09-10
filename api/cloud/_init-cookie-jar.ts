import * as request from 'request';
import * as rp from 'request-promise-native';
import { Credentials } from '../../types/api';
import config from '../../config';

const defaultRequestOptions: Partial<rp.Options> = {
	resolveWithFullResponse: true,
	simple: false,
	json: true
};

async function getAuthCookies(cookieJar: request.CookieJar, credentials: Credentials): Promise<void> {
	const { username, password } = credentials;
	const [login, domain]: string[] = username.split('@');

	await rp({
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
}

async function getSdcsCookie(cookieJar: request.CookieJar): Promise<void> {
	await rp({
		...defaultRequestOptions,
		url: `${config.api.authBaseUrl}/sdc`,
		method: 'HEAD',
		qs: {
			from: 'https://cloud.mail.ru/home/'
		},
		jar: cookieJar
	});
}

async function initCookieJar(cookieJar: request.CookieJar, credentials: Credentials): Promise<request.CookieJar> {
	await getAuthCookies(cookieJar, credentials);
	await getSdcsCookie(cookieJar);

	return cookieJar;
}
