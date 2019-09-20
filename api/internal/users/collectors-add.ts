import { RequestResult } from '../../../types/api';
import call, { callAsync } from '../call';

export interface Options {
	email: string;
	collect: Array<{
		type: 'pop3' | 'imap' | 'exchange';
		email: string;
		user_name?: string;
		password?: string;
		server?: string;
		port?: number;
		ssl?: boolean;
		folder?: number;
		import?: boolean;
		addressbook?: boolean;
		apply_filters?: boolean;
		mark?: boolean;
		keep_original?: boolean;

		flags?: {
			need_activation_by_user?: boolean;
			used_oauth?: boolean;
			used_internal_oauth?: boolean;
			used_custom_settings?: boolean;
		};
	}>;
	options?: {
		need_activation_by_user?: boolean;
		used_oauth?: boolean;
		used_internal_oauth?: boolean;
		used_custom_settings?: boolean;
	};
}

/**
 * @see https://apidoc.devmail.ru/e.mail.ru/users/collectors/add
 */
export default function usersCollectorsAdd(options: Options): RequestResult<string[]> {
	return call('users/collectors/add', options, 'POST');
}

export async function usersCollectorsAddAsync(options: Options): Promise<RequestResult<string[]>> {
	return callAsync('users/phones/add', options, 'POST');
}
