import { MailAPI } from '@qa/api';
import { Credentials, RequestResult } from '../../types/api';
import call, { callAsync } from './call';

/**
 * @see http://api.tornado.dev.mail.ru/helpers/remove
 */
export default function helpersRemove(
	options: MailAPI.HelpersRemove,
	credentials?: Credentials
): RequestResult<string> {
	return call('helpers/remove', options, 'POST', credentials);
}

export async function helpersRemoveAsync(
	options: MailAPI.HelpersRemove,
	credentials?: Credentials
): Promise<RequestResult<string>> {
	return callAsync('helpers/remove', options, 'POST', credentials);
}
