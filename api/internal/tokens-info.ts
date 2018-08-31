import call, {callAsync, RequestResult} from './call';


type Id = {restore_id: string} | {id: string};

/**
 * @see http://api.tornado.dev.mail.ru/test/tokens/info
 */
export default function tokensInfo (options: {email: string} & Id): RequestResult<string> {
	return call('test/tokens/info', options);
}

export async function tokensInfoAsync (options: {email: string} & Id): Promise<RequestResult<string>> {
	return callAsync('test/tokens/info', options);
}
