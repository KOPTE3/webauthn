import { MailAPI } from '@qa/api';
import { RequestResult } from '../../../types/api';
import call, { callAsync } from '../call';

/**
 * http://api.tornado.dev.mail.ru/messages/metadata/check
 */

interface Options {
	uidl: string;
	email?: string;
}

interface Result {
	metadata: {json_ld: Array<{[k: string]: any}>};
}

export default function metaGet(
	opt: Options
): RequestResult<Result> {
	return call('golang/messages/metadata/check', opt, 'POST');
}

export async function metaGetAsync(
	opt: Options
): Promise<RequestResult<Result>> {
	return callAsync('golang/messages/metadata/check', opt, 'POST');
}
