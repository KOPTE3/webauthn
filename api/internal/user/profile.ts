import { RequestResult } from '../../../types/api';
import call, { callAsync } from '../call';

type Options = {email: string} | {id: string};

export type ProfileBody = Array<{
	field: string;
	value: string;
	base64?: 1;
}>;

/**
 * @see http://api.tornado.dev.mail.ru/user/profile
 */
export default function userProfile(options: Options): RequestResult<ProfileBody> {
	return call('user/profile', options);
}

export async function userProfileAsync(options: Options): Promise<RequestResult<ProfileBody>> {
	return callAsync('user/profile', options);
}
