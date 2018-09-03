import { MailAPI } from '@qa/api';
import { RequestResult } from '../../types/api';
import call, { callAsync } from './call';

/**
 * @see http://api.tornado.dev.mail.ru/folders/open
 */
export default function foldersOpen (options: MailAPI.FoldersOpen): RequestResult<string[]> {
	return call('folders/open', options);
}

export async function foldersOpenAsync (options: MailAPI.FoldersOpen): Promise<RequestResult<string[]>> {
	return callAsync('folders/open', options);
}
