import { MailAPI } from '@qa/api';
import { Credentials, RequestResult } from '../../../types/api';
import call, { callAsync } from '../call';

interface ThreadsStatusSmartBody {
	folders: Array<{
		id: number;
		system: number;
		share?: 'give' | 'take';
		owner?: {
			email: string;
		};
		type: string;
		name: string;
		parent: string;
	}>;
	threads: any[];
	collectors: any[];
	messages_total: number;
	threads_total: number;
}

/**
 * @see http://api.tornado.dev.mail.ru/threads/status/smart
 */
export default function threadsStatusSmart(
	options: MailAPI.ThreadsStatusSmart,
	credentials?: Credentials
): RequestResult<ThreadsStatusSmartBody> {
	return call('threads/status/smart', options, 'GET', credentials);
}

export async function threadsStatusSmartAsync(
	options: MailAPI.ThreadsStatusSmart,
	credentials?: Credentials
): Promise<RequestResult<ThreadsStatusSmartBody>> {
	return callAsync('threads/status/smart', options, 'GET', credentials);
}
