import { RequestResult } from '../../../types/api';
import call, { callAsync } from '../call';

interface Option {
	email: string;
	phone_id: string;
}

interface Options {
	users: Option[];
}

const method = 'users/2-step-auth/enable';

/**
 * @see http://api.tornado.dev.mail.ru/users/2-step-auth/enable
 */
export default function twoStepEnable(options: Options): RequestResult<any> {
	return call(method, options);
}

export async function twoStepEnableAsync(options: Options): Promise<RequestResult<any>> {
	return callAsync(method, options);
}
