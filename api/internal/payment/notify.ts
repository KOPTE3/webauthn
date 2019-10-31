import { MailAPI } from '@qa/api';
import { RequestResult } from '../../../types/api';
import call from '../call';

/**
 * @see https://apidoc.devmail.ru/e.mail.ru/whitelabel/payment/notify/
 */
export default function notify(options: MailAPI.UserEdit): RequestResult<void> {
	return call('test/whitelabel/payment/notify', options, 'POST');
}
