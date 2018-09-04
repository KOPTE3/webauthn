import {MailAPI} from '@qa/api';
import {RequestResult} from '../../types/api';
import call, {callAsync} from './call';


/**
 * @see http://api.tornado.dev.mail.ru/tokens/send
 */
export default function tokensSend (options: MailAPI.TokensSend): RequestResult<string> {
	return call('tokens/send', options);
}

export async function tokensSendAsync (options: MailAPI.TokensSend): Promise<RequestResult<string>> {
	return callAsync('tokens/send', options);
}
