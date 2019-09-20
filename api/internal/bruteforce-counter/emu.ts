import { RequestResult } from '../../../types/api';
import call, { callAsync } from '../call';

export interface Options {
	phone: string;
	set_rid?: string;
}

export interface SmsVerificatorResponse {
	brute: string;
	config: any;
}

/**
 * Используется только для тестирования работы абф в smsverificator
 * Для эмуляции абф в других концах нужно ручками дёргать запросы
 * @see https://apidoc.devmail.ru/e.mail.ru/test/bruteforce-counter/emu
 */
export default function bruteforceCounterEmu(options: Options): RequestResult<SmsVerificatorResponse> {
	return call('test/bruteforce-counter/emu', options);
}

export async function bruteforceCounterEmuAsync(options: Options): Promise<RequestResult<SmsVerificatorResponse>> {
	return callAsync('test/bruteforce-counter/emu', options);
}
