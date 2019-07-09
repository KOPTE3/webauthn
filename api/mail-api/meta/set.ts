import { MailAPI } from '@qa/api';
import { Credentials, RequestResult } from '../../../types/api';
import call, { callAsync } from '../call';

/**
 * http://api.tornado.dev.mail.ru/test/message/set_msg_props
 */
export default function metaSet(
	options: MailAPI.TestMessageSetMsgProps, credentials?: Credentials
): RequestResult<string[]> {
	return call('test/message/set_msg_props', options, 'POST', credentials);
}

export async function metaSetAsync(
	options: MailAPI.TestMessageSetMsgProps,
	credentials?: Credentials
): Promise<RequestResult<string[]>> {
	return callAsync('test/message/set_msg_props', options, 'POST', credentials);
}
