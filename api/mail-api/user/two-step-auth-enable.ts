import { MailAPI } from '@qa/api';
import { Credentials, RequestResult } from '../../../types/api';
import call, { callAsync } from '../call';
import { IRPCOptions } from '../../rpc/index';

export interface User2StepAuthEnableResponseBody {
	auth: {
		reg_token: {
			id: string;
			[key: string]: any;
		}
		[key: string]: any;
	};

	[key: string]: any;
}

export interface User2StepAuthEnable extends MailAPI.User2StepAuthEnable {
	phone_id: string;
	redirect_uri: string;
	password: string;
	reg_token?: {
		id: string;
		value: string;
	};
}

/**
 * @see https://apidoc.devmail.ru/e.mail.ru/user/2-step-auth/enable
 */
export default function user2StepAuthEnable(
	options: User2StepAuthEnable,
	credentials?: Credentials,
	opts?: IRPCOptions
): RequestResult<User2StepAuthEnableResponseBody> {
	return call('user/2-step-auth/enable', options, 'POST', credentials, opts);
}

export async function user2StepAuthEnableAsync(
	options: User2StepAuthEnable,
	credentials?: Credentials,
	opts?: IRPCOptions
): Promise<RequestResult<User2StepAuthEnableResponseBody>> {
	return callAsync('user/2-step-auth/enable', options, 'POST', credentials, opts);
}