import { RequestResult } from '../../../types/api';
import call, { callAsync } from '../call';

export interface Options {
    email: string;
    limit: string;
}

/**
 * @see https://apidoc.devmail.ru/e.mail.ru/test/user/box/
 */
export default function userBoxLimit(options: Options): RequestResult<any> {
    return call('test/user/box', options);
}

export async function userBoxLimitAsync(options: Options): Promise<RequestResult<any>> {
    return callAsync('test/user/box', options);
}