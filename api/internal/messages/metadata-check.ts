import { RequestResult } from '../../../types/api';
import call, { callAsync } from '../call';

/**
 * http://api.tornado.dev.mail.ru/messages/metadata/check
 */

export interface IMetadataCheckOptions {
	uidl: string;
	email?: string;
}

export interface IMetadataCheckOptionsResult {
	metadata: {json_ld: Array<{[k: string]: any}>};
}

export default function metadataCheck(
	opt: IMetadataCheckOptions
): RequestResult<IMetadataCheckOptionsResult> {
	return call('golang/messages/metadata/check', opt, 'POST');
}

export async function metadataCheckAsync(
	opt: IMetadataCheckOptions
): Promise<RequestResult<IMetadataCheckOptionsResult>> {
	return callAsync('golang/messages/metadata/check', opt, 'POST');
}
