import { MailAPI } from '@qa/api';
import { RequestResult } from '../../../types/api';
import call, { callAsync } from '../call';

/**
 * @see https://apidoc.devmail.ru/e.mail.ru/whitelabel/payment/notify/
 */
export default function whiteLabelPaymentNotify(options: MailAPI.WhitelabelPaymentNotify): RequestResult<void> {
	return call('test/whitelabel/payment/notify', options, 'POST');
}

export async function whiteLabelPaymentNotifyAsync(
	options: MailAPI.WhitelabelPaymentNotify): Promise<RequestResult<void>> {
	return callAsync('test/whitelabel/payment/notify', options, 'POST');
}
