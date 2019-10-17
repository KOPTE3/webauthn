import { MailAPI as MailApiInterfaces } from '@qa/api';
import { assertDefinedValue } from '../../utils/assert-defined';
import authorization from '../../store/authorization';
import { Credentials } from '../../types/api';
import * as MailApi from '../../api/mail-api';

export default class FoldersApiStep {
	@step('Очистить папку {ids}')
	clearFolders(ids: {}, credentials?: Credentials): void {
		MailApi.foldersClear({
			ids
		}, credentials);
	}

	@step('Отредактироваться папку с id: {__result__}')
	editFolders(foldersData: MailApiInterfaces.FoldersEdit['folders'], credentials?: Credentials): number[] {
		const body = MailApi.foldersEdit({
			folders: foldersData
		}, credentials).body;

		return assertDefinedValue(body).map((folderId: string) => +folderId);
	}

	// Устанавливает на папку в качестве пароля пароль от ящика
	@step('Установить пароль на папку с id {folderID}')
	setPasswordFolder(folderID: number, credentials?: Credentials): void {
		this.editFolders(
			[{
				id: folderID.toString(),
				secret: {
					folder_password: credentials ? credentials.password : authorization.account.get('password'),
					user_password: credentials ? credentials.password : authorization.account.get('password'),
					question: 'Кто тут',
					answer: 'Никто'
				}
			}]
		);
	}
}

export const foldersApiStep = new FoldersApiStep();
