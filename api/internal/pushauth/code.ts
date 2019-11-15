import { RequestResult } from '../../../types/api';
import call, { callAsync } from '../call';
import { addSwaSignatureParams } from '../../../utils/swaSig';
import config from '../../../config';

interface Options {
	email: string;
	reg_token: string;
}

interface CodeAnswerBody {
	code: string;
}

/**
 * @see https://apidoc.devmail.ru/auth.mail.ru/internal/testapi/pushauth/code/
 */
export default function pushauthCode(options: Options): RequestResult<CodeAnswerBody> {
	return call(
		'internal/testapi/pushauth/code',
		addSwaSignatureParams(options),
		'GET',
		{ baseUrl: config.api.swaBaseUrl }
	);
}

export async function pushauthCodeAsync(options: Options): Promise<RequestResult<CodeAnswerBody>> {
	return callAsync(
		'internal/testapi/pushauth/code',
		addSwaSignatureParams(options),
		'GET',
		{ baseUrl: config.api.swaBaseUrl }
	);
}
