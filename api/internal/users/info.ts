import { RequestResult } from '../../../types/api';
import call, { callAsync } from '../call';

/**
 * Интерфейс неполный, его можно и нужно дополнить
 */
export interface UserInfoBody {
	id: number;
	login: string;
	domain: string;
}

/**
 * @see https://apidoc.devmail.ru/e.mail.ru/users/
 */
export default function getUserInfo(userInfo: {emails: string[]}): RequestResult<UserInfoBody> {
	return call('users', userInfo, 'POST');
}

export async function getUserInfoAsync(userInfo: {emails: string[]}): Promise<RequestResult<UserInfoBody>> {
	return callAsync('users', userInfo, 'POST');
}
