import { URL } from 'url';
import RPC, { IRPCResponse, IRPCOptions } from '../rpc';
import authorization from '../../store/authorization';
import { Credentials, RequestResult } from '../../types/api';

let defaultRpc: RPC;

export default function call(
	path: string,
	body: object,
	method: 'POST' | 'GET' = 'GET',
	credentials?: Credentials,
	opts?: IRPCOptions
): RequestResult {
	const result: RequestResult = browser.waitForPromise(callAsync(path, body, method, credentials, opts));

	if (result.error) {
		const { error, ...fields } = result;
		Object.assign(error, fields);
		throw error;
	}

	return result;
}

export async function callAsync(
	path: string,
	body: object,
	method: 'POST' | 'GET' = 'GET',
	credentials?: Credentials,
	opts?: IRPCOptions
): Promise<RequestResult> {
	const defaultCredentials: AccountManager.Credentials & Credentials = authorization.account.data();
	if (!(defaultRpc && defaultRpc.credentials.username === defaultCredentials.username) && !credentials) {
		if (!defaultCredentials) {
			throw new Error('No authorized user found. Please call auth() step before or pass credentials explicitly.');
		}

		defaultRpc = new RPC(defaultCredentials, opts);
	}

	const rpc: RPC = (credentials) ? new RPC(credentials, opts) : defaultRpc;
	const { host, version, noHttps } = { ...rpc.credentials, ...rpc.options };

	const response: IRPCResponse = await rpc.call(path, body);
	const { status, body: responseBody } = response;

	const result: RequestResult = {
		path,
		response: {
			statusCode: status,
			body: response,
			headers: {},
			request: {
				uri: new URL(`http${noHttps ? '' : 's'}://${host}/api/v${version}/${path}`),
				method,
				headers: {}
			}
		}
	};

	const validStatusCodes: number[] = opts && opts.validStatusCodes || [];
	const isValidStatusCode = (status >= 200 && status < 400) || validStatusCodes.includes(status);

	if (isValidStatusCode) {
		result.status = status;
		result.body = responseBody;
	} else if (status === 404) {
		result.error = new Error(`Method "${path}" is not implemented yet`);
	} else {
		result.error = new Error(`Method "${path}" returns invalid response code ${status}`);
	}

	return result;
}
