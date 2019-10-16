import * as InternalApi from '../../api/internal';
import { UserEditOptions } from '../../api/internal/users/edit';
import { PhoneStatus } from '../../api/internal/user/phones-state';
import userProfileSet from '../../api/internal/user/profile-set';
import authorization from '../../store/authorization';
import phonesStore from '../../store/phones';
import { assertDefinedValue } from '../../utils/assert-defined';
import { JsonArray, JsonObject } from 'type-fest';
import Authorization from '../../utils/authorization';

export type PhoneStatusStep = PhoneStatus | 'in_remove_queue' | 'twofa';
export type ExtraEmailStatusStep = 'ok' | 'too_young' | 'in_remove_queue';

export default class InternalApiSteps {
	@step('"Протушить" все аттачи на написании письма')
	invalidateAllAttachesInCompose(messageId: string) {
		const { email = '' } = authorization.account.data() || Authorization.CurrentAccount() || {};
		InternalApi.messagesAttachesInvalidate({
			email,
			message_id: messageId
		});
	}

	@step('Добавить телефон для пользователя "{email}" с типом "{type}"')
	addPhone(storeIndex: number, email: string, type: PhoneStatusStep) {
		const phone: string = phonesStore.getNumber(storeIndex);
		const body = InternalApi.usersPhonesAdd({
			email,
			phones: [{
				phone,
				mobile: true
			}]
		}).body;

		const phoneId = assertDefinedValue(body)[0];

		let initialType: PhoneStatus;
		switch (type) {
			case 'in_remove_queue':
			case 'twofa':
				initialType = 'ok';
				break;
			default:
				initialType = type;
		}

		InternalApi.userPhonesState({ email, phone, state: initialType });

		if (type === 'in_remove_queue') {
			InternalApi.usersPhonesRemove({ email, id: phoneId });
		}

		if (type === 'twofa') {
			InternalApi.twoStepEnable({ users: [ { email, phone_id: phoneId } ] });
		}

		return phoneId;
	}

	@step('Установить пользователю {username} несколько доп. почт: {extraEmails}')
	setExtraEmails(username: string, extraEmails: Array<{email: string; status: ExtraEmailStatusStep}>) {
		const fieldEmails = extraEmails.map(({ email, status }) => {
			switch (status) {
				case 'too_young':
					return { e: email, vt: Math.floor(Date.now() / 1000) };
				case 'in_remove_queue':
					// удаление через 3 дня
					return { e: email, vt: 1, et: Math.floor(Date.now() / 1000) + 3 * 24 * 60 * 60 };
				case 'ok':
				default:
					return { e: email, vt: 1 };
			}
		});

		/**
		 * Александр Алешин (21.08.2019 13:36):
		 * в коде апишки так - первая из почт из списка в Emails в статусе ok или too_young дублируется в поле Email
		 *
		 * Александр Алешин (21.08.2019 13:37):
		 * но при этом, например, при отправке уведомлений на текущий момент вообще не имеет значение поле Emails,
		 * берем сразу из Email, поскольку там легаси код...
		 * ну собственно для такого легаси кода и было сделано дублирование
		 */

		const firstOkOrTooYoung = extraEmails
			.find((extraEmail) => extraEmail.status === 'ok' || extraEmail.status === 'too_young');

		userProfileSet({
			email: username,
			field: 'Emails',
			value: JSON.stringify(fieldEmails)
		});

		if (firstOkOrTooYoung) {
			userProfileSet({
				email: username,
				field: 'Email',
				value: firstOkOrTooYoung.email
			});
		}
	}

	@step('Установить для пользователя "{email}" поле профиля {field}={value}')
	setProfileField(email: string, field: string, value: string) {
		const response = userProfileSet({
			email,
			field,
			value
		});

		return assertDefinedValue(response.body).body;
	}

	@step('Задать пользователю дату рождения {__result__}')
	setUserBirthday(login: string, domain: string, date: Required<UserEditOptions>['birthday']): string {
		const userToEdit = {
			login,
			domain,
			birthday: {
				day: date.day,
				month: date.month,
				year: date.year
			}
		};

		InternalApi.usersEdit({
			users: [userToEdit]
		});

		return `${date.day}.${date.month}.${date.year}`;
	}

	@step('Задать пользователю таймзону c id {timezoneId},{autodetect ? "" : " не"} определять автоматически')
	setUserTimezone(login: string, domain: string, timezoneId: number, autodetect: boolean = false) {
		const userToEdit = {
			login,
			domain,
			timezone_autodetect: autodetect,
			timezone_id: timezoneId
		};

		InternalApi.usersEdit({
			users: [userToEdit]
		});
	}

	@step('Задать пользователю {sex === "male" ? "мужской" : "женский"} пол')
	setUserGender(login: string, domain: string, sex: 'male' | 'female') {
		const userToEdit = {
			login,
			domain,
			sex
		};

		InternalApi.usersEdit({
			users: [userToEdit]
		});
	}

	@step('Задать данные имя, фамилию, псевдоним и дату рождения')
	setUserNamesAndBirthday(login: string, domain: string, data: Partial<UserEditOptions>) {
		const userToEdit = {
			login,
			domain,
			birthday: data.birthday,
			name: data.name,
			nick: data.nick
		};

		InternalApi.usersEdit({
			users: [userToEdit]
		});
	}

	/**
	 * Дожидаемся появляения jsonLd в мете письма
	 */
	waitForJsonLd(uidl: string, email: string): Array<{ [key: string]: any }> {
		let jsonLd: Array<{ [key: string]: any }> = [];

		browser.waitUntil(() => {
			const body = assertDefinedValue(InternalApi.metadataCheck({ uidl, email }).body);
			jsonLd = body.metadata && body.metadata.json_ld;

			return !!(jsonLd && jsonLd.length);
		}, undefined, `Не дождались меты у письма ${uidl}`);

		return jsonLd;
	}

	/**
	 * Обновляет мету письма по указанному индексу
	 * @param {string} uidl - идентификатор письма
	 * @param {string} email - email пользователя, в ящике котрого лежит письмо
	 * @param {object} metaUpdate - объект с новыми значениями полей меты
	 * @param {number = 0} metaIndex - индекс нукжной нам меты среди прочих мет письма
	 */
	@step('Обновляем мету письма с uidl {uidl}:', (...args: any[]) => {
		const metaUpdate: JsonObject = args[2];
		return Object.entries(metaUpdate).reduce((result: JsonObject, [key, value]) => ({
			...result,
			[key]: (typeof value === 'undefined') ? '<удалено>' : value
		}), {});
	})
	updateLetterMeta(uidl: string, email: string, metaUpdate: JsonObject, metaIndex: number = 0): void {
		const jsonLd: JsonObject[] = this.waitForJsonLd(uidl, email);
		const meta: JsonObject = jsonLd[metaIndex];

		// собираем новую мету
		const newMeta: JsonObject = {
			...meta,
			...metaUpdate
		};

		// собираем новый jsonld
		const newJsonLd: JsonArray = [...jsonLd];
		newJsonLd[metaIndex] = newMeta;

		// обновляем jsonld в письме
		InternalApi.messageSetMsgProps({
			email,
			message_id: uidl,
			props: {
				metadata: JSON.stringify({ json_ld: newJsonLd })
			}
		});
	}

	@step('Обновляем пользователю лимит ящика')
	updateBoxLimit(email: string, limit: number) {
		const data = {
			email,
			limit
		};

		InternalApi.userBoxLimit(data);
	}
}

export const internalApiSteps = new InternalApiSteps();
