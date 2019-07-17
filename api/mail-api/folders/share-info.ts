import {Credentials, RequestResult} from '../../../types/api';
import call, {callAsync} from '../call';


export interface FoldersShareInfo {
	folders: Array<{
		folder_id: number;
		invited: Array<{
			email: string;
		}>;
		owner: {
			email: string;
		};
	}>;
}

/**
 * @see http://api.tornado.dev.mail.ru/folders/share/info
 */
export default function foldersShareInfo (options: {}, credentials?: Credentials): RequestResult<FoldersShareInfo> {
	return call('folders/share/info', options, 'POST', credentials);
}

export async function foldersShareInfoAsync (
	options: {},
	credentials?: Credentials,
): Promise<RequestResult<FoldersShareInfo>> {
	return callAsync('folders/share/info', options, 'POST', credentials);
}
