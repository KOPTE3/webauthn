import { MailAPI } from '@qa/api';
import { Credentials, RequestResult } from '../../../types/api';
import call, { callAsync, CallOptions } from '../call';

/**
 * http://api.tornado.dev.mail.ru/test/message/set_msg_props
 */
export default function metaSet(
	params: MailAPI.TestMessageSetMsgProps, opt: CallOptions
): RequestResult<string[]> {
	return call('test/message/set_msg_props', params, 'POST', opt);
}

export async function metaSetAsync(
	params: MailAPI.TestMessageSetMsgProps,
	opt: CallOptions
): Promise<RequestResult<string[]>> {
	return callAsync('test/message/set_msg_props', params, 'POST', opt);
}
