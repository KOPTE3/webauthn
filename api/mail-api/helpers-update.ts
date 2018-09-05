import { MailAPI } from '@qa/api';
import { Credentials, RequestResult } from '../../types/api';
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
 * @see http://api.tornado.dev.mail.ru/helpers/update
 */
export default function helpersUpdate(
	options: MailAPI.HelpersUpdate,
	credentials?: Credentials
): RequestResult<HelpersUpdateResponseBody> {
	return call('helpers/update', options, 'POST', credentials);
}

export async function helpersUpdateAsync(
	options: MailAPI.HelpersUpdate,
	credentials?: Credentials
): Promise<RequestResult<HelpersUpdateResponseBody>> {
	return callAsync('helpers/update', options, 'POST', credentials);
}
