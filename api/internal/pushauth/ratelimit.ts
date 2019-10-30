import { RequestResult } from '../../../types/api';
import call, { callAsync } from '../call';
import { FoldersBody } from '../user/folders';
import { addSwaSignatureParams } from '../../../utils/url';

interface Options {
	login: string;
}

/**
 * @see https://apidoc.devmail.ru/auth.mail.ru/internal/testapi/pushauth/ratelimit/drop/
 */
export default function dropRateLimit(options: Options): RequestResult<FoldersBody> {
	return call('internal/testapi/pushauth/code', addSwaSignatureParams(options));
}

export async function dropRateLimitAsync(options: Options): Promise<RequestResult<FoldersBody>> {
	return callAsync('internal/testapi/pushauth/code', addSwaSignatureParams(options));
}
