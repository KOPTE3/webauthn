import { MailAPI } from '@qa/api';
import { RequestResult } from '../../../types/api';
import call, { callAsync, CallOptions } from '../call';

/**
 * http://api.tornado.dev.mail.ru/messages/metadata/check
 */
export default function metaGet(
	params: MailAPI.MessagesMetadataCheck, opt: CallOptions
): RequestResult<string[]> {
	return call('messages/metadata/check', params, 'POST', opt);
}

export async function metaGetAsync(
	params: MailAPI.MessagesMetadataCheck,
	opt: CallOptions
): Promise<RequestResult<string[]>> {
	return callAsync('messages/metadata/check', params, 'POST', opt);
}
