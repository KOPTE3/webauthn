import { Credentials, RequestResult } from '../../types/api';
import call, { callAsync } from './call';

interface Options {
	home: string;
}

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
	options: Options,
	credentials?: Credentials
): RequestResult<FileResponseBody> {
	return call('file', options, 'GET', credentials);
}

export async function fileAsync(
	options: Options,
	credentials?: Credentials
): Promise<RequestResult<FileResponseBody>> {
	return callAsync('file', options, 'GET', credentials);
}
