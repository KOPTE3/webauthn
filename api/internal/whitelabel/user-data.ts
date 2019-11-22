import { MailAPI } from '@qa/api';
import { RequestResult } from '../../../types/api';
import call, { callAsync } from '../call';

/**
 * @see https://apidoc.devmail.ru/e.mail.ru/whitelabel/user/data
 */
export default function whiteLabelUserData(options: MailAPI.User): RequestResult<any> {
	return call('test/whitelabel/user/data', options, 'GET');
}

export async function whiteLabelUserDataAsync(options: MailAPI.User): Promise<RequestResult<any>> {
	return callAsync('test/whitelabel/user/data', options, 'GET');
}