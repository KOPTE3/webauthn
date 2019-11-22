import { RequestResult } from '../../../types/api';
import call, { callAsync } from '../call';

interface ResetUserData {
	email: string;
	version: number;
	stat: string;
}

/**
 * @see https://apidoc.devmail.ru/e.mail.ru/test/messages/services/cleanmaster/stat/insert/
 */
export function messagesServicesCleanmasterStatInsert(options: ResetUserData): RequestResult<null> {
	return call('golang/test/messages/services/cleanmaster/stat/insert', options);
}

export async function messagesServicesCleanmasterStatInsertAsync(options: ResetUserData): Promise<RequestResult<null>> {
	return callAsync('golang/test/messages/services/cleanmaster/stat/insert', options);
}
