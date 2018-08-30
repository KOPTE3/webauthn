import * as Debug from 'debug';
import * as rp from 'request-promise-native';
import {Options} from 'request-promise-native';
import {Url} from 'url';


const debug = Debug('@qa:yoda:internal');
const PROXY_PATH = 'http://internal.pre.win102.dev.mail.ru/api/v1/test';

export interface RequestResult<T = any> {
	path: string;
	status?: number;
	response?: {
		statusCode: number;
		body: any;
		headers: {
			[name: string]: string;
		};
		request: {
			uri: Url;
			method: 'POST' | 'GET';
			headers: {
				[name: string]: string;
			};
		};
	};
	error?: Error;
	body?: T;
}

export default function call (path: string, body: object, method: 'POST' | 'GET' = 'GET'): RequestResult {
	return browser.waitForPromise(callAsync(path, body, method));
}

export async function callAsync (path: string, body: object, method: 'POST' | 'GET' = 'GET'): Promise<RequestResult> {
	const options: Options = {
		url: path,
		method,
	};

	switch (method) {
		case 'GET': {
			options.qs = body;
			break;
		}
		case 'POST': {
			options.formData = Object.entries(body).reduce((formdata: any, [key, value]) => {
				formdata[key] = (typeof value === 'string') ? value : JSON.stringify(value);
				return formdata;
			}, {});
			break;
		}
	}

	debug('Request with options \n%O', options);

	const result: RequestResult = {
		path,
		error: null,
	};

	try {
		const response = await rp({
			...options,
			resolveWithFullResponse: true,
			baseUrl: PROXY_PATH,
			json: true,
		});
		result.response = response.toJSON();

		if (response.statusCode !== 404) {
			const {status, body} = response.body;
			result.status = status;
			result.body = body;
		} else {
			result.error = new Error(`Method "${path}" is not implemented yet`);
		}
	} catch (requestError) {
		result.error = requestError;
	}

	if (!result.error) {
		debug('Response code is %d; body is \n%O', result.status, result.body);
	} else {
		debug('Request fauled due to \n%O', result.error);
	}

	return result;
}
