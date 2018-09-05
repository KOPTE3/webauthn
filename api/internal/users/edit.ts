import {RequestResult} from '../../../types/api';
import call, {callAsync} from '../call';


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
}

/**
 * @see http://api.tornado.dev.mail.ru/users/edit
 */
export default function usersEdit (options: {users: UserEditOptions[]}): RequestResult<null> {
	return call('users/edit', options, 'POST');
}

export async function usersEditAsync (options: {users: UserEditOptions[]}): Promise<RequestResult<null>> {
	return callAsync('users/edit', options, 'POST');
}
