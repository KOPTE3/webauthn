import * as rp from 'request-promise-native';
import { Credentials } from '../../types/api';
import config from '../../config';

interface CloudApiResponse {
	email: string;
	time: string;
	status: number;
	body: any;
}

interface DefaultRequestBody {
	email: string;
	'x-email': string;
	token: string;
}

let defaultMpopCookie: string;

async function getMpopCookie(credentials: Credentials): Promise<string> {
	const { username, password } = credentials;

	const response = await rp({
		url: config.api.authUrl,
		method: 'POST',
		headers: {
			'User-Agent': config.api.userAgent
		},
		formData: {
			Login: username,
			Password: password,
			autotest: 1
		},
		resolveWithFullResponse: true,
		followRedirect: false,
		simple: false
	});

	return response.headers['set-cookie']
		.find((cookie: string) => cookie.includes('Mpop'))
		.match(/^(Mpop=\d+:[A-za-z0-9]+:[A-za-z0-9]+@\w+\.\w+:)/)[1];
}

async function getCsrfToken(credentials: Credentials): Promise<string> {
	const { username: email } = credentials;

	const response = await rp({
		url: `${config.api.cloudApiBaseUrl}/tokens/csrf`,
		method: 'GET',
		headers: {
			'User-Agent': config.api.userAgent,
			'Cookie': getMpopCookie(credentials)
		},
		json: true,
		qs: {
			email,
			'x-email': email
		}
	});

	return response.body.body.token;
}

export async function callAsync(path: string, body: object, method: 'POST' | 'GET' = 'GET', credentials?: Credentials) {

}
