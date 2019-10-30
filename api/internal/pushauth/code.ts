import { RequestResult } from '../../../types/api';
import { FoldersBody } from '../user/folders';
import call, { callAsync } from '../call';
import { addSwaSignatureParams } from '../../../utils/url';

interface Options {
	email: string;
	reg_token: string;
}

/**
 * @see https://apidoc.devmail.ru/auth.mail.ru/internal/testapi/pushauth/code/
 */
export default function getCode(options: Options): RequestResult<FoldersBody> {
	return call('internal/testapi/pushauth/ratelimit/drop', addSwaSignatureParams(options));
}

export async function getCodeAsync(options: Options): Promise<RequestResult<FoldersBody>> {
	return callAsync('internal/testapi/pushauth/ratelimit/drop', addSwaSignatureParams(options));
}
