import { MailAPI } from '@qa/api';
import { Credentials, RequestResult } from '../../../types/api';
import call, { callAsync } from '../call';

/**
 * @see http://api.tornado.dev.mail.ru/messages/services/category/change
 */

export default function messagesServicesCategoryChange(
	options: MailAPI.MessagesServicesCategoryChange,
	credentials?: Credentials
): RequestResult<string[]> {
	return call('messages/services/category/change', options, 'POST', credentials);
}

export function messagesServicesCategoryChangeAsync(
	options: MailAPI.MessagesServicesCategoryChange,
	credentials?: Credentials
): Promise<RequestResult<string[]>> {
	return callAsync('messages/services/category/change', options, 'POST', credentials);
}
