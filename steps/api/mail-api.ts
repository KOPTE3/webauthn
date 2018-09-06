import { MailAPI as MailApiInterfaces } from '@qa/api';
import helpers from '../../store/helpers';
import * as MailApi from '../../api/mail-api';

type ArrayElement<ArrayType> = ArrayType extends Array<infer ElementType> ? ElementType : never;
const defaultFolderData: ArrayElement<MailApiInterfaces.FoldersAdd['folders']> = {
	name: 'Test folder',
	parent: '-1', // root
	type: 'user',
	only_web: false
};

export default class MailApiSteps {
	@step(
		'Создать папку с указанными параметрами. В результате созданы папки с id {__result__}',
		(folderData: any) => folderData
	)
	createFolder(folderData: ArrayElement<MailApiInterfaces.FoldersAdd['folders']>): number {
		return +MailApi.foldersAdd({
			folders: [{
				...defaultFolderData,
				...folderData
			}]
		}).body[0];
	}

	@step('Создать папки с указанными параметрами. В результате созданы папки с id: [{__result__}]', (folders: any[]) =>
		folders.reduce((foldersObject, folder) => ({
			...foldersObject,
			[folder.name]: folder
		}),            {})
	)
	createFolders(foldersData: MailApiInterfaces.FoldersAdd['folders']): number[] {
		return MailApi.foldersAdd({
			folders: foldersData.map((folderData) => ({
				...defaultFolderData,
				...folderData
			}))
		}).body.map((folderId: string) => +folderId);
	}

	@step('Создать {params ? "кастомную" : ""} папку Архив')
	createArchive(params?: ArrayElement<MailApiInterfaces.FoldersAdd['folders']>): number {
		return +MailApi.foldersAdd({
			folders: [{
				...defaultFolderData,
				name: 'Архив',
				type: 'archive',
				...params
			}]
		}).body[0];
	}

	@step('{isEnabled ? "В" : "Вы"}ключить треды{refresh ? " и обновить страницу" : ""}')
	toggleThreads(isEnabled: boolean, refresh: boolean = false) {
		MailApi.helpersUpdate({ // helpers.threads, { state: enabled });
			index: helpers.threads,
			update: { state: isEnabled }
		});

		if (refresh) {
			browser.refresh();
		}
	}

	@step('Открыть запароленные папки с id: [{__result__}]')
	openFolders(foldersData: Array<{ id: number, password: string }>): number[] {
		return MailApi.foldersOpen({
			folders: foldersData.map(({ id, password }) => ({
				id: `${id}`,
				secret: { folder_password: password }
			}))
		}).body.map((folderId: string) => +folderId);
	}

	getMessagesCount(folder: number): number {
		return MailApi.messagesStatus({ folder }).body.messages_total;
	}

	/**
	 * Ждать пока письмо с нужной темой не появится в MailboxStatus
	 *
	 * @param {string} subject — тема письма
	 * @param {number} folder — папка, в которую следует поместить письмо
	 * @param {number} [count=1] — ожидаемое количество писем
	 * @param {number} [limit] — ограничение по количеству писем
	 */
	@step('Ожидание появления сообщения "{subject}" ("{count}" шт.) в папке "{folder}" в MailboxStatus"')
	waitForLetterBySubjectInStatus(subject: string, folder: number, count: number = 1, limit?: number) {
		browser.waitUntil(() => {
			const { messages } = MailApi.messagesStatus({ folder, limit }).body;

			return messages.filter((message) => message.subject === subject).length >= count;
		},                null, `Сообщение с темой письма "${subject}" ("${count}" шт.) для папки "${folder}" отсутствует в статусе`);
	}

	getCurrentSignature(returnHtml: boolean = false): string {
		const currentSignObject = MailApi.userShort({}).body.signs.find((sign) => sign.active);

		return (!currentSignObject) ? null : (returnHtml) ? currentSignObject.sign_html : currentSignObject.sign;
	}

	getUidlBySubjectInFolder(folderId: number, subject: string): string {
		return MailApi.messagesStatus({ folder: folderId }).body.messages.find((message) => message.subject === subject).id;
	}

	@step('Добавить контакт с именем {nick} и email {email} в адресную книгу')
	addContact(nickName: string, email: string) {
		MailApi.abContactsAdd({
			contacts: [{
				nick: nickName,
				emails: [email],
				name: {}
			}]
		});
	}
}
