import * as request from 'request';
import { Credentials, RequestResult } from '../../types/api';
import config from '../../config';
import initCookieJar from './_init-cookie-jar';
import * as rp from 'request-promise-native';
import authorization from '../../store/authorization';
import * as Debug from 'debug';

const debug = Debug('@qa:yoda:cloud-api');

/**
 * Добавление index signature к интерфейсу rp.Options
 */
type RequestOptions = rp.Options & { [key: string]: any };

const cookieJar: request.CookieJar = rp.jar();
const defaultRequestOptions: Partial<rp.Options> = {
	headers: {
		'User-Agent': config.api.userAgent
	},
	json: true,
	resolveWithFullResponse: true,
	jar: cookieJar
};

async function getCsrfToken(credentials: Credentials) {
	const response = await rp({
		...defaultRequestOptions,
		url: `${config.api.cloudApiBaseUrl}/tokens/csrf`,
		method: 'GET',
		jar: await initCookieJar(cookieJar, credentials)
	});

	console.log('tokens/csrf RESPONSE', response);

	if (response.statusCode >= 200 && response.statusCode < 400) {
		debug(`Successfully obtained CSRF token: ${response.body.token}`);
	} else {
		throw new Error(`${response.request.url} returned error (status code ${response.statusCode}): \
		${JSON.stringify(response.body)}`);
	}

	return response.body.token;
}

export default function call(
	path: string,
	body: object,
	method: 'POST' | 'GET' = 'GET',
	credentials?: Credentials
): RequestResult {
	return browser.waitForPromise(callAsync(path, body, method, credentials));
}

export async function callAsync(
	path: string,
	body: object,
	method: 'POST' | 'GET' = 'GET',
	credentials?: Credentials
): Promise<RequestResult> {
	const { username, password }: Credentials = credentials || authorization.account.data();

	const requestOptions: RequestOptions = {
		...defaultRequestOptions,
		url: `${config.api.cloudApiBaseUrl}/${path}`,
		method
	};

	const requestBodyKey: string = (method === 'GET') ? 'qs' : 'form';
	requestOptions[requestBodyKey] = {
		email: username,
		'x-email': username,
		token: await getCsrfToken({ username, password }),
		...body
	};

	const result: RequestResult = {
		path
	};

	try {
		const response = await rp(requestOptions);
		result.response = response.toJSON();

		if (response.statusCode >= 200 && response.statusCode < 400) {
			const { status, body } = response.body;
			result.status = status;
			result.body = body;
		} else {
			result.error = new Error(`Method "${path}" returns invalid response code ${response.statusCode}`);
		}
	} catch (requestError) {
		result.error = requestError;
	}

	return result;
}
