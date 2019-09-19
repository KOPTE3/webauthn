import * as rp from 'request-promise-native';
import * as Request from 'request';
import * as Debug from 'debug';
import {
	CommonAccount,
	loginAccountAsync,
	getSdcsCookie,
	checkSdcsCookie,
	getToken
} from '../../utils/authorization';
import { assertDefinedValue } from '../../utils/assert-defined';
import config from '../../config';

const debug = Debug('@qa:yoda:rpc');

interface IEncode {
	[name: string]: string;
}

const encodeParams = <T> (params: IEncode = {}): Partial<IEncode> => {
	for (const [ key, value ] of Object.entries(params)) {
		if (typeof value === 'object') {
			params[key] = JSON.stringify(value);
		}
	}

	return params;
};

class RPC {
	constructor(credentials: TemporaryAny, options: IRPCOptions = {}) {
		this.credentials = credentials;
		this.options = {
			host: 'https://e.mail.ru',
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

	/**
	 * Получение авторизационных данных
	 */

	/** Получение CSRF-токена */
	async token() {
		const { host } = this.options;
		const { email } = this.credentials;

		// получаем авторизационные куки
		const session = await loginAccountAsync(this.credentials, host);
		const hasSdcsCookie = checkSdcsCookie(session.cookies);

		// если не смогли получить sdcs куку первый раз, пробуем еще раз
		if (!hasSdcsCookie) {
			await getSdcsCookie(host);
		}

		// делаем запрос за токеном
		const response = await getToken(email, assertDefinedValue(host));

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
			resolveWithFullResponse: false
		};

		debug('rpc call options:', rpcOpts);
		try {
			const response = await rp(rpcOpts);

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
