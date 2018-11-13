import { MailAPI } from '@qa/api';
import { Credentials, RequestResult } from '../../../types/api';
import call, { callAsync } from '../call';

/**
 * @see http://api.tornado.dev.mail.ru/aliases/add
 */
export default function aliasesRemove(options: MailAPI.AliasesRemove, credentials?: Credentials): RequestResult<void> {
	return call('aliases/remove', options, 'POST', credentials);
}

export async function aliasRemoveAsync(
	options: MailAPI.AliasesRemove,
	credentials?: Credentials
): Promise<RequestResult<void>> {
	return callAsync('aliases/remove', options, 'POST', credentials);
}
