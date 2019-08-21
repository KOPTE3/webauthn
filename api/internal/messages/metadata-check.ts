import { RequestResult } from '../../../types/api';
import call, { callAsync } from '../call';
import { JsonObject } from 'type-fest';

/**
 * http://api.tornado.dev.mail.ru/messages/metadata/check
 */

export interface IMessagesMetadataCheckOptions {
	uidl: string;
	email?: string;
}

export interface IMessagesMetadataCheckResult {
	metadata: {
		json_ld: JsonObject[]
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
