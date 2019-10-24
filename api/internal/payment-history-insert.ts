import { RequestResult } from '../../types/api';
import call, { callAsync } from './call';
import { RequireExactlyOne } from 'type-fest';

interface RawOptions {
	date?: number; // default - текущий таймстемп
	provider: string;
	description: string; // или description_parts
	description_parts: Array<{ // или description
		field: string,
		value: string | number
	}>;
	thread_id?: string;
	amount: string;
}

export type Options = RequireExactlyOne<RawOptions, 'description' | 'description_parts'>;

/**
 * @see https://apidoc.devmail.ru/e.mail.ru/test/payment/history/insert
 */
export default function paymentHistoryInsert(options: Options): RequestResult<void> {
	return call('test/payment/history/insert', options);
}

export async function paymentHistoryInsertAsync(options: Options): Promise<RequestResult<void>> {
	return callAsync('test/payment/history/insert', options);
}
