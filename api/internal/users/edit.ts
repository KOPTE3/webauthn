import { RequestResult } from '../../../types/api';
import call, { callAsync } from '../call';

/**
 * Интерфейс неполный, его можно и нужно дополнить
 */
export interface UserEditOptions {
	login: string;
	domain: string;
	flags?: {
		testbox?: boolean;
	};
	common_purpose_flags?: {
		visited_from_mobile_app?: boolean;
	};
	name?: {
		first: string;
		last: string;
	};
	nick?: string;
	birthday?: {
		day: number;
		month: number;
		year: number;
	};
	city?: number;
}

/**
 * @see https://apidoc.devmail.ru/e.mail.ru/users/edit
 */
export default function usersEdit(options: {users: UserEditOptions[]}): RequestResult<null> {
	return call('users/edit', options, 'POST');
}

export async function usersEditAsync(options: {users: UserEditOptions[]}): Promise<RequestResult<null>> {
	return callAsync('users/edit', options, 'POST');
}
