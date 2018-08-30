import call, {callAsync} from './call';


type Options = {name: string} | {names: string[]};

/**
 * @see http://api.tornado.dev.mail.ru/test/config
 */
export default function config(options: Options) {
	return call('config', options);
}

export async function configAsync (options: Options) {
	return callAsync('config', options);
}
