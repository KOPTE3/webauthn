import call, {callAsync, RequestResult} from './call';


interface Options {
	email: string;
	additional_email: string;
}

/**
 * @see http://api.tornado.dev.mail.ru/test/user/additional-email/change
 */
export default function userAdditionalEmailChange (options: Options): RequestResult<void> {
	return call('user/additional-email/change', options);
}

export async function userAdditionalEmailChangeAsync (options: Options): Promise<RequestResult<void>> {
	return callAsync('user/additional-email/change', options);
}
