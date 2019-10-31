import { MailAPI } from '@qa/api';
import { RequestResult } from '../../../types/api';
import call from '../call';

/**
 * @see https://apidoc.devmail.ru/e.mail.ru/whitelabel/user/data
 */
export default function userData(options: MailAPI.UserEdit): RequestResult<void> {
	return call('test/whitelabel/user/data', options, 'GET');
}
