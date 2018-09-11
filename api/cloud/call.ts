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
	simple: true,
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
	const { body: responseBody } = response;

	if (response.statusCode >= 200 && response.statusCode < 400) {
		debug(`Successfully obtained CSRF token: ${responseBody.body.token}`);
	} else {
		throw new Error(`${response.request.url} returned error (status code ${response.statusCode}): \
		${JSON.stringify(responseBody.body)}`);
	}

	return responseBody.body.token;
}

export default function call(
	path: string,
	body: object,
	method: 'POST' | 'GET' = 'GET',
	credentials?: Credentials,
	allow404: boolean = false
): RequestResult {
	const result: RequestResult = browser.waitForPromise(callAsync(path, body, method, credentials, allow404));

	if (result.error) {
		const { error, ...fields } = result;
		Object.assign(error, fields);
		throw error;
	} else if (result.status < 200 || result.status >= 400) {
		const error = new Error(`Request failed with body.status is ${result.status}`);
		Object.assign(error, result);
		throw error;
	}

	return result;
}

export async function callAsync(
	path: string,
	body: object,
	method: 'POST' | 'GET' = 'GET',
	credentials?: Credentials,
	allow404: boolean = false
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

	debug('Request with options \n%O', {
		...requestOptions,
		jar: requestOptions.jar.getCookies('https://cloud.mail.ru')
	});

	const result: RequestResult = {
		path
	};

	try {
		const response = await rp(requestOptions)
			.catch((requestError) => {
				if (allow404) {
					return requestError;
				} else {
					throw requestError;
				}
			});
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

	if (!result.error) {
		debug('Response code is %d; body is \n%O', result.status, result.body);
	} else {
		debug('Request failed due to \n%O', result.error);
	}

	return result;
}
