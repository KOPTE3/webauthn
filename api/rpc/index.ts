import * as rp from 'request-promise-native';
import * as Request from 'request';
import * as Debug from 'debug';
import {
	CommonAccount,
	loginAccountAsync,
	getSdcsCookie,
	checkSdcsCookie,
	getToken,
	parseAccount
} from '../../utils/authorization';
import { assertDefinedValue } from '../../utils/assert-defined';
import { Credentials } from '../../types/api';
import config from '../../config';

const debug = Debug('@qa:yoda:rpc');

interface IEncode {
	[name: string]: string;
}

const encodeParams = <T> (params: IEncode = {}): Partial<IEncode> => {
	for (const [ key, value ] of Object.entries(params)) {
		if (value !== null &&  typeof value === 'object') {
			params[key] = JSON.stringify(value);
		}
	}

	return params;
};

class RPC {
	constructor({ username: email, password }: Credentials, options: IRPCOptions = {}) {
		this.credentials = parseAccount(email, password);
		this.useOptions(options);
	}

	useOptions(options: IRPCOptions = {}): void {
		this.options = {
			host: config.api.mailBaseUrl,
			version: 1,
			json: true,
			clearJar: false,
			...options
		};
	}

	/** Опции */
	options: IRPCOptions;

	/** Полномочия */
	credentials: CommonAccount;

	private tokenValue: string;
	private jarValue: Request.CookieJar;

	/**
	 * Получение авторизационных данных
	 */

	/** Получение CSRF-токена */
	async token(): Promise<{token: string, jar: Request.CookieJar}> {
		let { host: origin } = this.options;
		origin = origin || config.api.mailBaseUrl;
		if (this.tokenValue && this.jarValue && !this.options.clearJar) {
			if (!checkSdcsCookie(this.jarValue, origin)) {
				await getSdcsCookie({ origin, jarVal: this.jarValue });
			}

			return {
				token: this.tokenValue,
				jar: this.jarValue
			};
		}
		const { email } = this.credentials;

		const jarVal = rp.jar();

		// получаем авторизационные куки
		await loginAccountAsync(this.credentials, jarVal);
		await getSdcsCookie({ origin, jarVal });

		// делаем запрос за токеном
		const response = await getToken(email, assertDefinedValue(origin), jarVal);
		this.tokenValue = response.token;
		this.jarValue = response.jar;

		return response;
	}

	/**
	 * Выполнение метода API
	 *
	 * @param {string} name — имя метода
	 * @param {Object} [params] — параметры запроса
	 * @param {string | Buffer | ReadableStream } [data] — данные
	 */
	async call(name: string, params: IRPCRequest = {}, data?: IRPCBody): Promise<IRPCResponse> {
		const { email } = this.credentials;
		const { version, host, noAuth, json, clearJar } = this.options;
		const { token, jar } = await this.token();

		const qs = noAuth ? {} : {
			email,
			token: params.token || token
		};

		// Исторически сложилось, что нужно кодировать все параметры 2-го уровня
		encodeParams<IRPCRequest>(params);

		const rpcOpts = {
			method: 'POST',
			uri:  `${host}/api/v${version}/${name}`,
			headers: {
				'Referer': host,
				'User-Agent': config.auth.ua
			},
			qs: {
				htmlencoded: false,
				...qs,
				...params
			},
			jar: clearJar ? rp.jar() : jar,
			simple: true,
			json,
			resolveWithFullResponse: true,
			strictSSL: false
		};

		debug('rpc request options:', rpcOpts);
		try {
			const response = await rp(rpcOpts);

			debug('request result:', response.toJSON());

			try {
				return JSON.parse(response);
			} catch (error) {
				return response;
			}
		} catch (error) {
			throw new Error('Could not handle your request\n' +  error.message);
		}
	}

	static HTTPStatus: IRPCStatus = {
		PROCESSING: 102,
		OK: 200,
		ACCEPTED: 202,
		NON_AUTHORITATIVE_INFORMATION: 203,
		PARTIAL_CONTENT: 206,
		MOVED_PERMANENTLY: 301,
		NOT_MODIFIED: 304,
		INVALID: 400,
		PAYMENT_REQUIRED: 402,
		DENIED: 403,
		NOT_FOUND: 404,
		NOT_ACCEPTABLE: 406,
		TIMEOUT: 408,
		CONFLICT: 409,
		EXPECTATION_FAILED: 417,
		UNPROCESSABLE: 422,
		LOCKED: 423,
		FAILED_DEPENDENCY: 424,
		UPGRADE_REQUIRED: 426,
		MANY_REQUESTS: 429,
		RETRY_WITH: 449,
		UNAVAILABLE_FOR_LEGAL_REASONS: 451,
		FAIL: 500,
		NOT_IMPLEMENTED: 501,
		SERVICE_UNAVALIABLE: 503,
		INSUFFICIENT_STORAGE: 507
	};
}

export interface IRPCDefaultParams {
	email?: string;
	htmlencoded?: boolean;
	[name: string]: any;
}

export interface IRPCRequest extends IRPCDefaultParams {
	token?: string;
}

export interface IRPCResponse extends IRPCDefaultParams {
	status: number;
	email: string;
	last_modified?: number;
	body: any;
	htmlencoded: boolean;
	[name: string]: any;
}

export interface IRPCOptions extends Request.CoreOptions {
	validStatusCodes?: number[];
	host?: string;
	version?: number;
	noAuth?: boolean;
	noHttps?: boolean;
	json?: boolean | any;
	clearJar?: boolean;
}

export type IRPCBody = string | Buffer | ReadableStream;
export type IRPCStatus = Readonly<{ [name: string]: number }>;

export default RPC;
