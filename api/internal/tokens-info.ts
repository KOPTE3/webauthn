import { RequestResult } from '../../types/api';
import call, { callAsync } from './call';

type Options = {email: string} & ({restore_id: string} | {id: string}) & {update?: Partial<TokensInfo>};

/**
 * неполный интерфейс, можно и нужно дополнить необходимыми полями
 */
export interface TokensInfo {
	transport: string;
	email: string;
	redirect_uri: string;
	method: string;
	code: string;
}

/**
 * @see http://api.tornado.dev.mail.ru/test/tokens/info
 */
export default function tokensInfo(options: Options): RequestResult<TokensInfo> {
	return call('test/tokens/info', options);
}

export async function tokensInfoAsync(options: Options): Promise<RequestResult<TokensInfo>> {
	return callAsync('test/tokens/info', options);
}
