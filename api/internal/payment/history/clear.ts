import { RequestResult } from '../../../../types/api';
import call, { callAsync } from '../../call';

interface Options {
	email: string;
}

/**
 * @see https://apidoc.devmail.ru/e.mail.ru/test/payment/history/clear
 */
export default function paymentHistoryClear(options: Options): RequestResult<void> {
	return call('test/payment/history/clear', options, 'POST');
}

export async function paymentHistoryClearAsync(options: Options): Promise<RequestResult<void>> {
	return callAsync('test/payment/history/clear', options, 'POST');
}
