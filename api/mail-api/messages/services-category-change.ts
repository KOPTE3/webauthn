import { MailAPI } from '@qa/api';
import { Credentials, RequestResult } from '../../../types/api';
import call, { callAsync } from '../call';
import { Merge } from 'type-fest';

/**
 * @see http://api.tornado.dev.mail.ru/messages/services/category/change
 */

// уточняем возможные значения поля category
type Categories = 'travel' | 'event' | 'finance' | 'registration' | 'order' | 'fees';
type MessagesServicesCategoryChange = Merge<MailAPI.MessagesServicesCategoryChange, { category: Categories }>;

export default function messagesServicesCategoryChange(
	options: MessagesServicesCategoryChange,
	credentials?: Credentials
): RequestResult<string[]> {
	return call('messages/services/category/change', options, 'POST', credentials);
}

export function messagesServicesCategoryChangeAsync(
	options: MessagesServicesCategoryChange,
	credentials?: Credentials
): Promise<RequestResult<string[]>> {
	return callAsync('messages/services/category/change', options, 'POST', credentials);
}
