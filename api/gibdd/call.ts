import * as request from 'request';
import { Credentials, RequestResult } from '../../types/api';
import config from '../../config';
import initCookieJar from '../init-cookie-jar';
import * as rp from 'request-promise-native';
import authorization from '../../store/authorization';
import * as Debug from 'debug';

const debug = Debug('@qa:yoda:gibdd-api');

const cookieJar: request.CookieJar = rp.jar();
const defaultRequestOptions: Partial<rp.Options> = {
	headers: {
		'User-Agent': config.api.userAgent,
		'Origin': 'https://e.mail.ru'
	},
	json: true,
	simple: true,
	resolveWithFullResponse: true,
	jar: cookieJar
};

export default function call(
	path: string,
	body?: object,
	method: 'DELETE' | 'POST' | 'GET' = 'GET',
	credentials?: Credentials
): RequestResult {
	const result: RequestResult = browser.waitForPromise(callAsync(path, body, method, credentials));

	if (result.error) {
		const { error, ...fields } = result;
		Object.assign(error, fields);
		throw error;
	} else if (result.status &&
		((result.status < 200) || (result.status >= 400))) {
		const error = new Error(`Request failed with body.status is ${result.status}`);
		Object.assign(error, result);
		throw error;
	}

	return result;
}

export async function callAsync(
	path: string,
	body?: object,
	method: 'DELETE' | 'POST' | 'GET' = 'GET',
	credentials?: Credentials
): Promise<RequestResult> {
	const { username, password }: Credentials = credentials || authorization.account.data();
	const jar = await initCookieJar(cookieJar, { username, password }, 'https://api.gibdd.mail.ru');
	const requestOptions: rp.OptionsWithUrl = {
		...defaultRequestOptions,
		jar,
		url: `${config.api.gibddApiBaseUrl}/${path}`,
		method
	};

	const requestBodyKey: keyof rp.Options = (method === 'GET') ? 'qs' : 'form';
	requestOptions[requestBodyKey] = {
		...body
	};

	debug('Request with options \n%O', requestOptions);

	const result: RequestResult = {
		path
	};

	try {
		const response = await rp(requestOptions)
			.catch((requestError) => {
				if (requestError.statusCode === 404) {
					return {
						...requestError,
						error: undefined,
						body: requestError.error,
						statusCode: 200
					};
				} else {
					throw requestError;
				}
			});
		result.response = response;

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
