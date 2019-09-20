import { RequestResult } from '../../../types/api';
import call, { callAsync } from '../call';

export enum BruteforceType {
	collectors = 'collectors',
	collectors2 = 'collectors2',
	folderlogin = 'folderlogin',
	api = 'api',
	sms = 'sms',
	pass_brute = 'pass_brute',
	brutechecklogin = 'brutechecklogin',
	phone_add = 'phone_add',
	smsverificator = 'smsverificator',
	confirm_filter_email_resend = 'confirm_filter_email_resend',
	sendmsg = 'sendmsg',
	brute_short_code = 'brute_short_code'
}

export interface Options {
	type: BruteforceType;
	key: string;
	rid?: string;
}

/**
 * @see https://apidoc.devmail.ru/e.mail.ru/test/bruteforce-counter/reset
 */
export default function bruteforceCounterReset(options: Options): RequestResult<null> {
	return call('test/bruteforce-counter/reset', options);
}

export async function bruteforceCounterResetAsync(options: Options): Promise<RequestResult<null>> {
	return callAsync('test/bruteforce-counter/reset', options);
}
