import { MailAPI } from '@qa/api';
import { RequestResult } from '../../../types/api';
import call, { callAsync } from '../call';

/**
 * http://api.tornado.dev.mail.ru/test/message/set_msg_props
 */
export default function metaSet(
	params: MailAPI.TestMessageSetMsgProps
): RequestResult<string[]> {
	return call('test/message/set_msg_props', params, 'POST');
}

export async function metaSetAsync(
	params: MailAPI.TestMessageSetMsgProps
): Promise<RequestResult<string[]>> {
	return callAsync('test/message/set_msg_props', params, 'POST');
}
