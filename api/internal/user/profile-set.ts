import { RequestResult } from '../../../types/api';
import call, { callAsync } from '../call';

export interface Options {
	email: string;
	field: string;
	value: string;
}

export interface ProfileSetBody {
	body: string;
}

/**
 * @see http://api.tornado.dev.mail.ru/user/profile/set
 */
export default function userProfileSet(options: Options): RequestResult<ProfileSetBody> {
	return call('user/profile/set', options);
}

export async function userProfileSetAsync(options: Options): Promise<RequestResult<ProfileSetBody>> {
	return callAsync('user/profile/set', options);
}
