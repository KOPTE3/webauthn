import { RequestResult } from '../../../types/api';
import call, { callAsync } from '../call';
import { addSwaSignatureParams } from '../../../utils/swaSig';
import config from '../../../config';

interface Options {
	login: string;
}

interface CodeAnswerBody {
}

/**
 * @see https://apidoc.devmail.ru/auth.mail.ru/internal/testapi/pushauth/ratelimit/drop/
 */
export default function pushauthRatelimitDrop(options: Options): RequestResult<CodeAnswerBody> {
	return call(
		'internal/testapi/pushauth/ratelimit/drop',
		addSwaSignatureParams(options),
		'GET',
		{ baseUrl: config.api.swaBaseUrl }
	);
}

export async function pushauthRatelimitDropAsync(options: Options): Promise<RequestResult<CodeAnswerBody>> {
	return callAsync(
		'internal/testapi/pushauth/ratelimit/drop',
		addSwaSignatureParams(options),
		'GET',
		{ baseUrl: config.api.swaBaseUrl }
	);
}
