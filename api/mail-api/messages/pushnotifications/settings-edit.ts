import { MailAPI } from '@qa/api';
import { Credentials, RequestResult } from '../../../../types/api';
import call, { callAsync } from '../../call';

export interface MessagesPushnotificationsSettingsEditResponseBody {
	error: {
		message: string;
		code: number;
	};
	validate_result: Array<{
		account: string;
		is_valid: boolean;
	}>;

	[key: string]: any;
}

/**
 * @see https://apidoc.devmail.ru/e.mail.ru/messages/pushnotifications/settings/edit
 */
export default function messagesPushnotificationsSettingsEdit(
	options: MailAPI.MessagesPushnotificationsSettingsEdit,
	credentials?: Credentials
): RequestResult<MessagesPushnotificationsSettingsEditResponseBody> {
	return call('messages/pushnotifications/settings/edit', options, 'POST', credentials);
}

export async function messagesPushnotificationsSettingsEditAsync(
	options: MailAPI.MessagesPushnotificationsSettingsEdit,
	credentials?: Credentials
): Promise<RequestResult<MessagesPushnotificationsSettingsEditResponseBody>> {
	return callAsync('messages/pushnotifications/settings/edit', options, 'POST', credentials);
}
