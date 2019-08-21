import { MailAPI } from '@qa/api';
import { Credentials, RequestResult } from '../../types/api';
import call, { callAsync } from './call';

/**
 * @see http://api.tornado.dev.mail.ru/payment/messages/status/update
 */
export default function paymentMessagesStatusUpdate(
	options: MailAPI.PaymentMessagesStatusUpdate,
	credentials?: Credentials
): RequestResult<{}> {
	return call('payment/messages/status/update', options, 'POST', credentials);
}

export async function paymentMessagesStatusUpdateAsync(
	options: MailAPI.PaymentMessagesStatusUpdate,
	credentials?: Credentials
): Promise<RequestResult<{}>> {
	return callAsync('payment/messages/status/update', options, 'POST', credentials);
}
