import { MailAPI } from '@qa/api';
import { RequestResult } from '../../types/api';
import call, { callAsync } from './call';
import { Merge } from 'type-fest';

// ошибка в апидоке - message_id должен быть строкой
type TestMessageSetMsgPropsFixed = Merge<MailAPI.TestMessageSetMsgProps, { message_id: string }>;

/**
 * http://api.tornado.dev.mail.ru/test/message/set_msg_props
 */
export default function messageSetMsgProps(
	params: TestMessageSetMsgPropsFixed
): RequestResult<string[]> {
	return call('test/message/set_msg_props', params, 'POST');
}

export async function messageSetMsgPropsAsync(
	params: TestMessageSetMsgPropsFixed
): Promise<RequestResult<string[]>> {
	return callAsync('test/message/set_msg_props', params, 'POST');
}
