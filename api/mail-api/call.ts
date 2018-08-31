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

export async function callAsync (
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

	const { status, body: responseBody }: MailApiResponse = await rpc.call(path, body);

	return {
		path,
		status,
		body: responseBody
	} as RequestResult;
}
