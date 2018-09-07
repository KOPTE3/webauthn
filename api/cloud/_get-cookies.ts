import * as rp from 'request-promise-native';
import { Credentials } from '../../types/api';
import config from '../../config';

interface AuthCookies {
	Mpop: string; // domain=.mail.ru
	ssdc: string; // domain=.auth.mail.ru
}

export interface Cookies {
	Mpop: string; // domain=.mail.ru
	sdcs: string; // domain=.cloud.mail.ru
}

const defaultRequestOptions: Partial<rp.Options> = {
	resolveWithFullResponse: true,
	followRedirect: true,
	simple: false,
	json: true
};

async function getAuthCookies(credentials: Credentials): Promise<AuthCookies> {
	const { username, password } = credentials;
	const [login, domain]: string[] = username.split('@');

	const response = await rp({
		url: `${config.api.authBaseUrl}/cgi-bin/auth`,
		method: 'POST',
		formData: {
			Login: login,
			Domain: domain,
			Password: password
		},
		...defaultRequestOptions
	});

	return (response.headers['set-cookie'] as string[]).reduce(
		(cookiesObject: AuthCookies, setCookieHeaderValue: string) => {
			const [cookie, cookieName]: string[] = setCookieHeaderValue.match(/^(Mpop|ssdc)=([^;]+)/) || [];

			return cookie ? {
				...cookiesObject,
				[cookieName]: cookie
			} : cookiesObject;
		},
		{}
	) as AuthCookies;
}

async function getSdcsCookie(authCookies: AuthCookies): Promise<string> {
	const commonOptions: Partial<rp.Options> = {
		...defaultRequestOptions,
		method: 'GET',
		headers: {
			'Cookie': Object.values(authCookies).join('; ')
		},
		followRedirect: false
	};

	let response = await rp({
		url: `${config.api.authBaseUrl}/sdc`,
		qs: {
			from: 'https://cloud.mail.ru/home/'
		},
		...commonOptions
	});
	const redirectLocation = response.headers.location;

	response = await rp({
		url: redirectLocation,
		...commonOptions
	});

	return response.headers['set-cookie']
		.reduce((sdcsCookie: string, cookie: string) => cookie.match(/^(sdcs=[A-Za-z0-9]+);/)[1], '');
}

export default async function getCookies(credentials: Credentials): Promise<Cookies> {
	const authCookies: AuthCookies = await getAuthCookies(credentials);

	return {
		Mpop: authCookies.Mpop,
		sdcs: await getSdcsCookie(authCookies)
	};
}
