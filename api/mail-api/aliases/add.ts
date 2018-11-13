import { MailAPI } from '@qa/api';
import { Credentials, RequestResult } from '../../../types/api';
import call, { callAsync } from '../call';

/**
 * @see http://api.tornado.dev.mail.ru/aliases/add
 */
export default function aliasesAdd(options: MailAPI.AliasesAdd, credentials?: Credentials): RequestResult<void> {
	return call('aliases/add', options, 'POST', credentials);
}

export async function aliasAddAsync(
	options: MailAPI.AliasesAdd,
	credentials?: Credentials
): Promise<RequestResult<void>> {
	return callAsync('aliases/add', options, 'POST', credentials);
}
