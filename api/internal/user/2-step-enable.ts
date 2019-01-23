import { RequestResult } from '../../../types/api';
import call, { callAsync } from '../call';
import RPC from '@qa/rpc';
import { bruteforceCounterReset, bruteforceCounterResetAsync, BruteforceType } from '../bruteforce-counter';
import tokensInfo, { tokensInfoAsync } from '../tokens-info';

interface Options {
	phone_id: string;
	redirect_uri: string;
	email: string;
	password: string;
	reg_token?: {id: string, value: string};
}

const method = 'user/2-step-auth/enable';

/**
 * @see http://api.tornado.dev.mail.ru/user/2-step-auth/enable
 */
export default function twoStepEnable(options: Options): RequestResult<any> {
	let response = call(method, options);

	if (response.status === RPC.HTTPStatus.MANY_REQUESTS) {
		bruteforceCounterReset({ type: BruteforceType.sms, key: method });
		response = call(method, options);
	}

	const id = response.body.auth.reg_token.id;

	const { body: { code } } = tokensInfo({ email: options.email, id });

	options.reg_token = { id, value: code };

	return call(method, options);
}

export async function twoStepEnableAsync(options: Options): Promise<RequestResult<any>> {
	let response = await callAsync(method, options);

	if (response.status === RPC.HTTPStatus.MANY_REQUESTS) {
		await bruteforceCounterResetAsync({ type: BruteforceType.sms, key: method });
		response = await callAsync(method, options);
	}

	const id = response.body.auth.reg_token.id;

	const { body: { code } } = await tokensInfoAsync({ email: options.email, id });

	options.reg_token = { id, value: code };

	return callAsync(method, options);
}
