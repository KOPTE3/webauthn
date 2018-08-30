import call, {callAsync, RequestResult} from './call';


type Options = {name: string} | {names: string[]};
export type ConfigBody = Array<{
	status: number;
	name: string;
	value: any;
}>

/**
 * @see http://api.tornado.dev.mail.ru/test/config
 */
export default function config (options: Options): RequestResult<ConfigBody> {
	return call('config', options);
}

export async function configAsync (options: Options): Promise<RequestResult<ConfigBody>> {
	return callAsync('config', options);
}
