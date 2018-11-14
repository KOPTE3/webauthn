import { MailAPI } from '@qa/api';
import { RequestResult } from '../../../types/api';
import call, { callAsync } from '../call';

/**
 * @see http://api.tornado.dev.mail.ru/aliases/add
 */
export default function aliasAdd(options: MailAPI.AliasesAdd): RequestResult<void> {
	return call('aliases/add', options, 'POST');
}

export async function aliasAddAsync(
	options: MailAPI.AliasesAdd
): Promise<RequestResult<void>> {
	return callAsync('aliases/add', options, 'POST');
}
