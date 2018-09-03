import RPC from '@qa/rpc';
import { Credentials, RequestResult } from '../../types/api';
import authorization from '../../store/authorization';
const { URL } = require('url'); // TODO: why not import?

interface MailApiResponse {
	status: number;
	email: string;
	last_modified?: number;
	body: any;
	htmlencoded: boolean;
}

let defaultRpc: RPC;

export default function call(
	path: string,
	body: object,
	method: 'POST' | 'GET' = 'GET',
	credentials?: Credentials
): RequestResult {
	const result: RequestResult = browser.waitForPromise(callAsync(path, body, method, credentials));

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
	credentials?: Credentials
): Promise<RequestResult> {
	let rpc: RPC;

	// TODO: refactor this creepy shit
	if (credentials) {
		rpc = new RPC(credentials);
	} else  {
		if (!defaultRpc) {
			const defaultCredentials: AccountManager.Credentials = authorization.account.data();

			if (!defaultCredentials) {
				throw new Error('No authorized user found. Please call auth() step before or pass credentials explicitly.');
			}

			const { username, password } = defaultCredentials;
			defaultRpc = new RPC({ username, password });
		}

		rpc = defaultRpc;
	}

	const { host, version, noHttps } = { ...rpc.credentials, ...rpc.options };

	const response: MailApiResponse = await rpc.call(path, body);
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

	if (status >= 200 && status < 400) {
		result.status = status;
		result.body = responseBody;
	} else if (status === 404) {
		result.error = new Error(`Method "${path}" is not implemented yet`);
	} else {
		result.error = new Error(`Method "${path}" returns invalid response code ${status}`);
	}

	return result;
}
