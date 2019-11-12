import call from '../call';
import { RequestResult } from '../../../types/api';

export interface Options {
	email: string;
	senders: number[];
}

export function putUnreadSenders(option: Options): RequestResult<{}> {
	return call(`golang/test/messages/services/cleanmaster/unread/add?senders=\[${option.senders.join(',')}\]`, {
		email: option.email,
		version_ts: Math.ceil(+(new Date()) / 1000)
	});
}

// Добавлено в рамках https://jira.mail.ru/browse/FMAIL-4538
// Чтобы тесты cleanmaster работали, в дальшейнем убрать
export function getUserInfo(emails: string[]): any {
	return call('users', {
		emails: JSON.stringify(emails)
	}
	).body[0];
}

export function bruteforceReset(type: string, method: any) {
	const key = `${method}`;

	return call(`golang/test/bruteforce-counter/reset?type=${type}&key=${key}`, {});
}

export function resetUserDataNew(email: string) {
	return call('golang/test/messages/services/cleanmaster/stat/insert', {
		email,
		version: 1,
		stat: [0, 0],
		action: 'insert stat'
	}, 'GET');
}
