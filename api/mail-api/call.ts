import RPC, { IRPCCredentials } from '@qa/rpc';
import { RequestResult } from '../../types/api';
import authorization from '../../store/authorization';


interface MailApiResponse {
	status: number;
	email: string;
	last_modified?: number;
	body: any;
	htmlencoded: boolean;
}

let rpc: RPC;

export default function call(
	path: string,
	body: object,
	method: 'POST' | 'GET' = 'GET',
	credentials?: IRPCCredentials
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
	credentials?: IRPCCredentials
): Promise<RequestResult> {
	if (!rpc && !credentials) {
		const { username, password } = authorization.account.data();
		rpc = new RPC({ username, password });
	} else if (credentials) {
		rpc = new RPC(credentials);
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
