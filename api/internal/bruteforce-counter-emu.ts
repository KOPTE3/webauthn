import call, {callAsync, RequestResult} from './call';


interface Options {
	phone: string;
	set_rid?: string;
}

export interface SmsVerificatorResponse {
	brute: string;
	config: any;
}

/**
 * @see http://api.tornado.dev.mail.ru/test/bruteforce-counter/emu
 */
export default function bruteforceCounterEmu (options: Options): RequestResult<SmsVerificatorResponse> {
	return call('test/bruteforce-counter/emu', options);
}

export async function bruteforceCounterEmuAsync (options: Options): Promise<RequestResult<SmsVerificatorResponse>> {
	return callAsync('test/bruteforce-counter/emu', options);
}
