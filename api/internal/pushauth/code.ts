import { RequestResult } from '../../../types/api';
import { FoldersBody } from '../user/folders';
import call, { callAsync } from '../call';
import { addSwaSignatureParams } from '../../../utils/url';
import config from '../../../config';

interface Options {
	email: string;
	reg_token: string;
}

/**
 * @see https://apidoc.devmail.ru/auth.mail.ru/internal/testapi/pushauth/code/
 */
export default function getCode(options: Options): RequestResult<FoldersBody> {
	return call(
		'internal/testapi/pushauth/code',
		addSwaSignatureParams(options),
		'GET',
		{ baseUrl: config.api.swaBaseUrl }
	);
}

export async function getCodeAsync(options: Options): Promise<RequestResult<FoldersBody>> {
	return callAsync(
		'internal/testapi/pushauth/code',
		addSwaSignatureParams(options),
		'GET',
		{ baseUrl: config.api.swaBaseUrl }
	);
}
