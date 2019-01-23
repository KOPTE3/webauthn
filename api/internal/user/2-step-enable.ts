import { RequestResult } from '../../../types/api';
import call, { callAsync } from '../call';

interface Option {
	email: string;
	phone_id: string;
}

const method = 'users/2-step-auth/enable';

/**
 * @see http://api.tornado.dev.mail.ru/users/2-step-auth/enable
 */
export default function twoStepEnable(options: Option[]): RequestResult<any> {
	return call(method, options);
}

export async function twoStepEnableAsync(options: Option[]): Promise<RequestResult<any>> {
	return callAsync(method, options);
}
