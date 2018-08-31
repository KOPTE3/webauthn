import call, {callAsync, RequestResult} from './call';


interface Options {
	email: string;
	phone: string;
	state: 'ok' | 'too_young' | 'nonverified';
}

/**
 * @see http://api.tornado.dev.mail.ru/test/user/phones/state
 */
export default function userPhonesState (options: Options): RequestResult<any> {
	return call('test/user/phones/state', options);
}

export async function userPhonesStateAsync (options: Options): Promise<RequestResult<any>> {
	return callAsync('test/user/phones/state', options);
}
