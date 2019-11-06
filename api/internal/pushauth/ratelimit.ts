import { RequestResult } from '../../../types/api';
import call, { callAsync } from '../call';
import { FoldersBody } from '../user/folders';
import { addSwaSignatureParams } from '../../../utils/url';
import config from '../../../config';

interface Options {
	login: string;
}

interface CodeAnswerBody {
}

/**
 * @see https://apidoc.devmail.ru/auth.mail.ru/internal/testapi/pushauth/ratelimit/drop/
 */
export default function dropRateLimit(options: Options): RequestResult<CodeAnswerBody> {
	return call(
		'internal/testapi/pushauth/ratelimit/drop',
		addSwaSignatureParams(options),
		'GET',
		{ baseUrl: config.api.swaBaseUrl }
	);
}

export async function dropRateLimitAsync(options: Options): Promise<RequestResult<CodeAnswerBody>> {
	return callAsync(
		'internal/testapi/pushauth/ratelimit/drop',
		addSwaSignatureParams(options),
		'GET',
		{ baseUrl: config.api.swaBaseUrl }
	);
}
