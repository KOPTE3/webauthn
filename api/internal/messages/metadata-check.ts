import { RequestResult } from '../../../types/api';
import call, { callAsync } from '../call';

/**
 * http://api.tornado.dev.mail.ru/messages/metadata/check
 */

export interface IMessagesMetadataCheckOptions {
	uidl: string;
	email?: string;
}

export interface IMessagesMetadataCheckResult {
	metadata: {
		json_ld: Array<{ [key: string]: any }>
	};
}

export default function metadataCheck(
	opt: IMessagesMetadataCheckOptions
): RequestResult<IMessagesMetadataCheckResult> {
	return call('golang/messages/metadata/check', opt, 'POST');
}

export async function metadataCheckAsync(
	opt: IMessagesMetadataCheckOptions
): Promise<RequestResult<IMessagesMetadataCheckResult>> {
	return callAsync('golang/messages/metadata/check', opt, 'POST');
}
