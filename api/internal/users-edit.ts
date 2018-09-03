import call, {callAsync, RequestResult} from './call';


/**
 * Интерфейс неполный, его можно и нужно дополнить
 */
export interface UsersEditOptions {
	id: string;
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
export default function usersEdit (options: UsersEditOptions): RequestResult<null> {
	return call('users/edit', options);
}

export async function usersEditAsync (options: UsersEditOptions): Promise<RequestResult<null>> {
	return callAsync('users/edit', options);
}
