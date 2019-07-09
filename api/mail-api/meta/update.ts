import { MailAPI } from '@qa/api';
import { Credentials, RequestResult } from '../../../types/api';
import call, { callAsync } from '../call';

/**
 *
 */
export default function metaUpdate(
	options: MailAPI.PaymentMessagesStatusUpdate, credentials?: Credentials
): RequestResult<string[]> {
	return call('payment/messages/status/update', options, 'POST', credentials);
}

export async function metaUpdateAsync(
	options: MailAPI.PaymentMessagesStatusUpdate,
	credentials?: Credentials
): Promise<RequestResult<string[]>> {
	return callAsync('payment/messages/status/update', options, 'POST', credentials);
}
