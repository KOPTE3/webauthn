import { MailAPI } from '@qa/api';
import { Credentials, RequestResult } from '../../../types/api';
import call, { callAsync } from '../call';

/**
 * @see https://apidoc.devmail.ru/e.mail.ru/collectors
 */
export default function collectorsGet(
	options: MailAPI.Collectors = {},
	credentials?: Credentials
): RequestResult<Collector[]> {
	return call('collectors', options, 'GET', credentials);
}

export async function collectorsGetAsync(
	options: MailAPI.Collectors = {},
	credentials?: Credentials
): Promise<RequestResult<Collector[]>> {
	return callAsync('collectors', options, 'GET', credentials);
}

export interface Collector {
	addressbook?: boolean;
	apply_filters?: boolean;
	email: string;
	flags?: object;
	folder?: number;
	folder_name?: string;
	id: number;
	import?: boolean;
	keep_original?: boolean;
	last_update?: number;
	mark?: boolean;
	port?: number;
	server?: string;
	ssl?: boolean;
	state: string;
	type?: string;
}
