import { MailAPI as MailApiInterfaces } from '@qa/api';
import * as merge from 'deepmerge';
import { bruteforceCounterReset, BruteforceType, tokensInfo } from '../../api/internal';
import * as MailApi from '../../api/mail-api';
import { threadsStatusSmart } from '../../api/mail-api/threads';
import authorization from '../../store/authorization';
import helpers from '../../store/helpers';
import { Phone } from '../../store/phones/index';
import { assertDefinedValue } from '../../utils/assert-defined';
import { Credentials } from '../../types/api';

/** Интерфейс для вывода данных, о созданной запароленной папке */
interface SecretFolderData {
	id: number;
	name: string;
	folder_password: string;
	question: string;
	answer: string;
}

type ArrayElement<ArrayType> = ArrayType extends Array<infer ElementType> ? ElementType : never;

const defaultFolderData: ArrayElement<MailApiInterfaces.FoldersAdd['folders']> = {
	name: 'Test folder',
	parent: '-1', // root
	type: 'user',
	only_web: false
};

/** Интерфейс для параметров включения 2fa */
interface User2StepAuthEnableOptions {
	username: string;
	password: string;
	phone: Phone;

	redirect_uri?: string;
}

interface SharedFolders {
	root?: {
		id: number;
		name: string;
	};
	list: Array<{
		id: number;
		name: string;
	}>;
}

export default class MailApiSteps {
	@step(
		'Создать папку с указанными параметрами. В результате созданы папки с id {__result__}',
		(folderData: any) => folderData
	)
	createFolder(folderData: ArrayElement<MailApiInterfaces.FoldersAdd['folders']>, credentials?: Credentials): number {
		const body = MailApi.foldersAdd({
			folders: [{
				...defaultFolderData,
				...folderData
			}]
		}, credentials).body;

		return +assertDefinedValue(body)[0];
	}

	@step(
		'Создать папки с указанными параметрами. В результате созданы папки с id: [{__result__}]',
		(folders: any[]) =>
			folders.reduce(
				(foldersObject, folder) => ({
					...foldersObject,
					[folder.name]: folder
				}),
				{}
			)
	)
	createFolders(foldersData: MailApiInterfaces.FoldersAdd['folders']): number[] {
		const body = MailApi.foldersAdd({
			folders: assertDefinedValue(foldersData)
				.map((folderData) => ({
				...defaultFolderData,
				...folderData
			}))
		}).body;

		return assertDefinedValue(body).map((folderId: string) => +folderId);
	}

	@step('Создать {params ? "кастомную" : ""} папку Архив')
	createArchive(params?: ArrayElement<MailApiInterfaces.FoldersAdd['folders']>): number {
		const body = MailApi.foldersAdd({
			folders: [{
				...defaultFolderData,
				name: 'Архив',
				type: 'archive',
				...params
			}]
		}).body;

		return +assertDefinedValue(body)[0];
	}

	@step('{isEnabled ? "В" : "Вы"}ключить треды{refresh ? " и обновить страницу" : ""}')
	toggleThreads(isEnabled: boolean, refresh: boolean = false) {
		MailApi.helpersUpdate({
			index: helpers.threads,
			update: { state: isEnabled }
		});

		if (refresh) {
			browser.refresh();
		}
	}

	@step('Открыть запароленные папки с id: [{__result__}]')
	openFolders(foldersData: Array<{id: number, password: string}>): number[] {
		const body = MailApi.foldersOpen({
			folders: foldersData.map(({ id, password }) => ({
				id: `${id}`,
				secret: { folder_password: password }
			}))
		}).body;

		return assertDefinedValue(body).map((folderId: string) => +folderId);
	}

	getMessagesCount(folder: number): number {
		const status = MailApi.messagesStatus({ folder }).body;

		return assertDefinedValue(status).messages_total;
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
		browser.waitUntil(
			() => {
				const { messages } = assertDefinedValue(MailApi.messagesStatus({ folder, limit }).body);

				return messages.filter((message) => message.subject === subject).length >= count;
			},
			void 0,
			`Сообщение с темой письма "${subject}" ("${count}" шт.) для папки "${folder}" отсутствует в статусе`
		);
	}

	getCurrentSignature(returnHtml: boolean = false): string | null {
		const currentSignObject = assertDefinedValue(MailApi.userShort({}).body)
			.signs.find((sign) => sign.active);

		return (!currentSignObject) ? null : (returnHtml) ? currentSignObject.sign_html : currentSignObject.sign;
	}

	getUidlBySubjectInFolder(folderId: number, subject: string): string {
		const status = MailApi.messagesStatus({ folder: folderId }).body;
		const message = assertDefinedValue(status).messages.find((message) => message.subject === subject);

		return assertDefinedValue(message).id;
	}

	@step('Добавить контакт с именем {nickName} и email {email} в адресную книгу')
	addContact(nickName: string, email: string) {
		MailApi.abContactsAdd({
			contacts: [{
				nick: nickName,
				emails: [email],
				name: {}
			}]
		});
	}

	@step('Создать запароленную папку. В результате создана папка с id "{__result__.id}"')
	createSecretFolder(
		params: ArrayElement<MailApiInterfaces.FoldersAdd['folders']> = {},
		credentials?: Credentials
	): SecretFolderData {
		const account = credentials || authorization;
		const folderData: ArrayElement<MailApiInterfaces.FoldersAdd['folders']> = merge(
			{
				...defaultFolderData,
				secret: {
					folder_password: account.password,
					user_password: credentials ? credentials.password : authorization.account.get('password'),
					question: 'кто я?',
					answer: 'никто'
				}
			},
			params
		);
		const {
			folder_password,
			question,
			answer
		} = folderData.secret as Required<{folder_password: string, question: string, answer: string}>;

		return {
			id: this.createFolder(folderData, credentials),
			name: assertDefinedValue(folderData.name),
			folder_password,
			question,
			answer
		};
	}

	@step('Загрузить список папок пользователя {credentials.username}, расшаренных другим пользователем {owner}')
	findSharedFolders(owner: string, credentials: Credentials): SharedFolders {
		const mailboxStatus = threadsStatusSmart({ folder: 0 }, credentials);
		const shared = assertDefinedValue(mailboxStatus.body).folders.filter((folder) => {
			return folder.owner && folder.owner.email === owner;
		});
		const root = shared.find(({ parent }) => parseInt(parent, 10) === -1);
		const list = shared
			.filter(({ parent }) => parseInt(parent, 10) !== -1)
			.map(({ id, name }) => ({ id: +id, name }));

		return {
			root: root && {
				id: root.id,
				name: root.name
			},
			list
		};
	}

	@step('Устновить настройку количества писем на странице - {size}')
	setMessagesPageSize(size: 5 | 10 | 15 | 25 | 50 | 100 | 200) {
		MailApi.userEdit({ messages: { size } });
	}

	@step('{isEnabled ? "В" : "Вы"}ключить метреды{refresh ? " и обновить страницу" : ""}')
	toggleMetathreads(isEnabled: boolean, refresh: boolean = false) {
		MailApi.userEdit({
			common_purpose_flags: {
				metathreads_on: isEnabled
			}
		});

		if (refresh) {
			browser.refresh();
		}
	}

	@step('Включить у пользователя {options.username} 2fa через sms')
	enable2StepAuth(options: User2StepAuthEnableOptions): void {
		bruteforceCounterReset({
			type: BruteforceType.sms,
			key: 'user/2-step-auth/enable'
		});

		bruteforceCounterReset({
			type: BruteforceType.sms,
			key: `${options.username}:user/2-step-auth/enable:${options.phone.phone}`
		});

		const enableRequest: MailApi.User2StepAuthEnable = {
			phone_id: options.phone.id,
			redirect_uri: options.redirect_uri || 'http://e.mail.ru/settings/security?twostep=enabled',
			password: options.password
		};

		const regTokenResponse = MailApi.user2StepAuthEnable(enableRequest, options, { validStatusCodes: [449] });
		const regTokenId = assertDefinedValue(regTokenResponse.body).auth.reg_token.id;

		const regTokenInfo = tokensInfo({
			email: options.username,
			id: regTokenId
		});

		enableRequest.reg_token = {
			id: regTokenId,
			value: assertDefinedValue(regTokenInfo.body).code
		};

		MailApi.user2StepAuthEnable(enableRequest, options);
	}
}

export const mailApiSteps = new MailApiSteps();
