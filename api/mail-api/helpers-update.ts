import { MailAPI } from '@qa/api';
import { RequestResult } from '../../types/api';
import call, {callAsync} from './call';

export interface HelpersUpdateResponseBody {
	index: number;
	state: boolean;
	time: number;
	count: {
		show: number;
		close: number;
	}
}

/**
 * @see http://api.tornado.dev.mail.ru/folders/add
 */
export default function usersPhonesAdd (options: MailAPI.HelpersUpdate): RequestResult<HelpersUpdateResponseBody> {
	return call('helpers/update', options);
}

export async function usersPhonesAddAsync (options: MailAPI.HelpersUpdate): Promise<RequestResult<HelpersUpdateResponseBody>> {
	return callAsync('helpers/update', options);
}
