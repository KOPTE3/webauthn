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

/**
 * Функция, реализующая получение CSRF-токена
 * Требует Mpop- и sdcs-кук, так что каждый раз их приходится обновлять
 * Вызывается при каждом запросе в API cloud.mail.ru
 *
 * @param {Credentials} credentials - credentials пользователя
 */
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
	} else if ((result.status < 200) || (result.status >= 400 && !(allow404 && result.status === 404))) {
		const error = new Error(`Request failed with body.status is ${result.status}`);
		Object.assign(error, result);
		throw error;
	}

	return result;
}

/**
 * allow404 - флаг, разрешающий считать статус 404 валидным
 * Нужен, например, для проверки существования файла в Облаке
 * Если он равен false, при возникновении 404 выбросится ошибка
 */
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
		jar: (requestOptions.jar as request.CookieJar).getCookies('https://cloud.mail.ru')
	});

	const result: RequestResult = {
		path
	};

	try {
		const response = await rp(requestOptions)
			.catch((requestError) => {
				if (allow404 && requestError.statusCode === 404) {
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
