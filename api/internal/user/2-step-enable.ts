import { RequestResult } from '../../../types/api';
import call, { callAsync } from '../call';

interface Option {
	email: string;
	phone_id: string;
}

export interface Options {
	users: Option[];
}

const method = 'users/2-step-auth/enable';

/**
 * @see https://apidoc.devmail.ru/e.mail.ru/users/2-step-auth/enable
 */
export default function twoStepEnable(options: Options): RequestResult<any> {
	// Работает только с POST
	return call(method, options, 'POST');
}

export async function twoStepEnableAsync(options: Options): Promise<RequestResult<any>> {
	return callAsync(method, options, 'POST');
}
