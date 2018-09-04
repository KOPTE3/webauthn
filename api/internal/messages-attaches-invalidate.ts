import { RequestResult } from '../../types/api';
import call, { callAsync } from './call';

interface Options {
	email: string,
	message_id?: string,
	attaches?: Array<string>
}

interface MessagesAttachesInvalidateResponseBody {
	attaches: Array<string>
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
