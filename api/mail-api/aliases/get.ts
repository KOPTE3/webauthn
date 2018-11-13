import { MailAPI } from '@qa/api';
import { Credentials, RequestResult } from '../../../types/api';
import call, { callAsync } from '../call';

/**
 * @see http://api.tornado.dev.mail.ru/aliases
 */
export default function aliasesGet(options: MailAPI.Aliases = {}, credentials?: Credentials): RequestResult<Alias[]> {
	return call('aliases', options, 'GET', credentials);
}

export async function aliasesGetAsync(
	options: MailAPI.Aliases = {},
	credentials?: Credentials
): Promise<RequestResult<Alias[]>> {
	return callAsync('aliases', options, 'GET', credentials);
}

export interface Alias {
	created: number;
	alias: string;
	folder: string;
}
