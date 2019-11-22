import { RequestResult } from '../../../../types/api';
import call, { callAsync } from '../../call';
import { RequireExactlyOne } from 'type-fest';

export interface RawItem {
	date: number; // unix timestamp
	status: 'new' | 'success' | 'awaiting' | 'error';
	provider: string;
	description: string; // или description_parts
	description_parts: Array<{ // или description
		field: string,
		value: string | number
	}>;
	thread_id?: string;
	amount: string;
	transaction_id?: string;
	history_type?: 'moneta' | 'gibdd';
}
export type Item = RequireExactlyOne<RawItem, 'description' | 'description_parts'>;

interface Options {
	email: string;
	items: Item[];
}

/**
 * @see https://apidoc.devmail.ru/e.mail.ru/test/payment/history/insert
 */
export default function paymentHistoryInsert(options: Options): RequestResult<void> {
	return call('test/payment/history/insert', options, 'POST');
}

export async function paymentHistoryInsertAsync(options: Options): Promise<RequestResult<void>> {
	return callAsync('test/payment/history/insert', options, 'POST');
}
