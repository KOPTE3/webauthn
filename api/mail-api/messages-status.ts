import { MailAPI } from '@qa/api';
import { Credentials, RequestResult } from '../../types/api';
import call, { callAsync } from './call';

export interface MessagesStatusResponseBody {
	token: string;
	messages: Array<{
		id: string;
		subject: string;

		[key: string]: any;
	}>
	messages_total: number;

	[key: string]: any;
}

/**
 * @see http://api.tornado.dev.mail.ru/messages/status
 */
export default function messagesStatus(
	options: MailAPI.MessagesStatus,
	credentials?: Credentials
): RequestResult<MessagesStatusResponseBody> {
	options.force = 1; //  принудительно вернуть список писем, даже если в ящике не было изменений
	return call('messages/status', options, 'GET', credentials);
}

export async function messagesStatusAsync(
	options: MailAPI.MessagesStatus,
	credentials?: Credentials
): Promise<RequestResult<MessagesStatusResponseBody>> {
	options.force = 1;
	return callAsync('messages/status', options, 'GET', credentials);
}
