import { Credentials, RequestResult } from '../../types/api';
import call, { callAsync } from './call';
import { CloudAPI } from '@qa/api';

interface FolderResponseBody {
	count: number;
	list: Array<{
		home: string;

		[key: string]: any
	}>;
}

export default function folder(
	options: CloudAPI.Folder,
	credentials?: Credentials
): RequestResult<FolderResponseBody> {
	return call('folder', options, 'GET', credentials);
}

export async function folderAsync(
	options: CloudAPI.Folder,
	credentials?: Credentials
): Promise<RequestResult<FolderResponseBody>> {
	return callAsync('folder', options, 'GET', credentials);
}
