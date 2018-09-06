import { RequestResult } from '../../types/api';
import call, { callAsync } from './call';

interface Options {
	email: string;
	message_id?: string;
	attaches?: string[];
}

interface MessagesAttachesInvalidateResponseBody {
	attaches: string[];
}

/**
 * @see http://api.tornado.dev.mail.ru/test/messages/attaches/invalidate
 */
export default function messagesAttachesInvalidate(
	options: Options
): RequestResult<MessagesAttachesInvalidateResponseBody> {
	return call('test/messages/attaches/invalidate', options);
}

export async function messagesAttachesInvalidateAsync(
	options: Options
): Promise<RequestResult<MessagesAttachesInvalidateResponseBody>> {
	return callAsync('test/messages/attaches/invalidate', options);
}
