import { RequestResult } from '../../../types/api';
import call, { callAsync } from '../call';

export interface Options {
	email: string;
	additional_email: string;
}

/**
 * @see https://apidoc.devmail.ru/e.mail.ru/test/user/additional-email/change
 */
export default function userAdditionalEmailChange(options: Options): RequestResult<void> {
	return call('test/user/additional-email/change', options);
}

export async function userAdditionalEmailChangeAsync(options: Options): Promise<RequestResult<void>> {
	return callAsync('test/user/additional-email/change', options);
}
