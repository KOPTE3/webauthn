import { MailAPI } from '@qa/api';
import { RequestResult } from '../../types/api';
import call, { callAsync } from './call';


/**
 * @see http://api.tornado.dev.mail.ru/folders/add
 */
export default function foldersAdd (options: MailAPI.FoldersAdd): RequestResult<string[]> {
	return call('folders/add', options);
}

export async function foldersAddAsync (options: MailAPI.FoldersAdd): Promise<RequestResult<string[]>> {
	return callAsync('folders/add', options);
}
