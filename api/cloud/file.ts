import { Credentials, RequestResult } from '../../types/api';
import call, { callAsync } from './call';
import { CloudAPI } from '@qa/api';

interface FileResponseBody {
	count?: { // if "home" field refers to folder
		folders: number,
		files: number
	};
	home: string & { // string if 200, object if 404
		value: string
		error: string
	};

	[key: string]: any;
}

/**
 * @see http://docs.i.munkin.devmail.ru/cloud-api/master/_docs/file.html
 */
export default function file(
	options: CloudAPI.File,
	credentials?: Credentials
): RequestResult<FileResponseBody> {
	return call('file', options, 'GET', credentials, true);
}

export async function fileAsync(
	options: CloudAPI.File,
	credentials?: Credentials
): Promise<RequestResult<FileResponseBody>> {
	return callAsync('file', options, 'GET', credentials, true);
}
