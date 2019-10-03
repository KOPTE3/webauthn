import { URL } from 'url';
import RPC, { IRPCOptions, IRPCResponse } from '../rpc';
import authorization from '../../store/authorization';
import { Credentials, RequestResult } from '../../types/api';
import * as Debug from 'debug';
import Authorization from '../../utils/authorization';

const debug = Debug('@qa:yoda:mail-api:call');

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

const rpcCache: Map<string, RPC> = new Map();

export async function callAsync(
	path: string,
	body: object,
	method: 'POST' | 'GET' = 'GET',
	credentials?: Credentials,
	opts?: IRPCOptions
): Promise<RequestResult> {
	const legacyAccountCredentials = authorization.account.data();
	const currentAccountCredentials = Authorization.CurrentAccount();

	const useAccountCredentials = credentials || legacyAccountCredentials || currentAccountCredentials;

	if (!useAccountCredentials) {
		throw new Error('No authorized user found. Please use Auth() step before or pass credentials explicitly');
	}

	const { username } = useAccountCredentials;

	let rpc = rpcCache.get(username);
	if (!rpc) {
		rpc = new RPC(useAccountCredentials, opts);
		rpcCache.set(username, rpc);
	}

	rpc.useOptions(opts);

	const { host, version, noHttps } = { ...rpc.credentials, ...rpc.options };

	const response: IRPCResponse = await rpc.call(path, body);

	const { body: { status, body: responseBody } } = response;

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
