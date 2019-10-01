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
	threads: Array<{
		id: string;
		length: number;
		length_unread: number;
		length_flagged: number;
		subject: string;
		folder: string;
	}>;
	collectors: any[];
	messages_total: number;
	threads_total: number;
}

/**
 * @see https://apidoc.devmail.ru/e.mail.ru/threads/status/smart
 */
export default function threadsStatusSmart(
	options: MailAPI.ThreadsStatusSmart,
	credentials?: Credentials
): RequestResult<ThreadsStatusSmartBody> {
	options.force = 1; // принудительно вернуть список писем, даже если в ящике не было изменений
	return call('threads/status/smart', options, 'GET', credentials);
}

export async function threadsStatusSmartAsync(
	options: MailAPI.ThreadsStatusSmart,
	credentials?: Credentials
): Promise<RequestResult<ThreadsStatusSmartBody>> {
	options.force = 1; // принудительно вернуть список писем, даже если в ящике не было изменений
	return callAsync('threads/status/smart', options, 'GET', credentials);
}