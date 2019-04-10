import { MailAPI } from '@qa/api';
import { Credentials, RequestResult } from '../../types/api';
import call, { callAsync } from './call';

interface Correnspondent {
	email: string;
	name: string;
	avatars: {
		default: string;
	};
}

export interface MessagesMessageResponseBody {
	id: string;
	subject: string; // заголовок письма
	size: number;
	folder: string; // идентификатор папки
	correspondents: {
		from: Correnspondent[];
		to: Correnspondent[];
	};
	body: {
		html: string; // html версия
		text: string; // plain text
	};

	[key: string]: any;
}

/**
 * @see http://api.tornado.dev.mail.ru/messages/message
 */
export default function messagesMessage(
	options: MailAPI.MessagesMessage,
	credentials?: Credentials
): RequestResult<MessagesMessageResponseBody> {
	return call('messages/message', options, 'GET', credentials);
}

export async function messagesMessageAsync(
	options: MailAPI.MessagesMessage,
	credentials?: Credentials
): Promise<RequestResult<MessagesMessageResponseBody>> {
	return callAsync('messages/message', options, 'GET', credentials);
}
