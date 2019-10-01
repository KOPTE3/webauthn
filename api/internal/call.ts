import * as Debug from 'debug';
import * as rp from 'request-promise-native';
import { RequestResult } from '../../types/api';
import config from '../../config';
import { CookieJar } from 'request';

const debug = Debug('@qa:yoda:internal');

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type CallError = Error & Omit<RequestResult, 'error'>;

export interface CallOptions {
	jar: CookieJar;
	validStatusCodes?: number[];
}

export default function call(
	path: string,
	body: object,
	method: 'POST' | 'GET' = 'GET',
	opts?: CallOptions
): RequestResult {
	const result: RequestResult = browser.waitForPromise(callAsync(path, body, method, opts));

	const validStatusCodes: number[] = opts && opts.validStatusCodes || [];
	const isInvalidStatusCode =
		result.status && (result.status < 200 || result.status >= 400) && !validStatusCodes.includes(result.status);
	if (result.error) {
		const { error, ...fields } = result;
		Object.assign(error, fields);
		throw error;
	}

	if (isInvalidStatusCode) {
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
	opts?: CallOptions
	): Promise<RequestResult> {
	const options: rp.Options = {
		url: path,
		method,
		...opts
	};

	switch (method) {
		case 'GET': {
			options.qs = body;
			break;
		}
		case 'POST': {
			options.formData = Object.entries(body).reduce(
				(formdata: any, [key, value]) => {
					formdata[key] = (typeof value === 'string') ? value : JSON.stringify(value);
					return formdata;
				},
				{}
			);
			break;
		}
	}

	const { jar, ...rest } = options;
	debug('Request with options \n%O', rest);
	if (jar) {
		debug('Request with cookies: \n%O', (jar as any)._jar.toJSON().cookies);
	}

	const result: RequestResult = {
		path
	};

	try {
		const response = await rp({
			...options,
			resolveWithFullResponse: true,
			baseUrl: config.internal.baseUrl,
			proxy: config.internal.proxyUrl,
			strictSSL: false,
			json: true
		});
		result.response = response.toJSON();

		const validStatusCodes: number[] = opts && opts.validStatusCodes || [];

		const isValidStatusCode =
			(response.statusCode >= 200 && response.statusCode < 400) || validStatusCodes.includes(response.statusCode);
		if (isValidStatusCode) {
			const { status, body } = response.body;
			result.status = status;
			result.body = body;
		} else if (response.statusCode === 404) {
			result.error = new Error(`Method "${path}" is not implemented yet`);
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
