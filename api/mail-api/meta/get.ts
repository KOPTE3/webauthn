import { MailAPI } from '@qa/api';
import { Credentials, RequestResult } from '../../../types/api';
import call, { callAsync } from '../call';

/**
 * http://api.tornado.dev.mail.ru/messages/metadata/check
 */
export default function metaGet(
	options: MailAPI.MessagesMetadataCheck, credentials?: Credentials
): RequestResult<string[]> {
	return call('/messages/metadata/check', options, 'POST', credentials);
}

export async function metaGetAsync(
	options: MailAPI.MessagesMetadataCheck,
	credentials?: Credentials
): Promise<RequestResult<string[]>> {
	return callAsync('/messages/metadata/check', options, 'POST', credentials);
}
