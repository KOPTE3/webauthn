import * as InternalApi from '../../api/internal';
import { PhoneStatus } from '../../api/internal/user/phones-state';
import userProfileSet from '../../api/internal/user/profile-set';
import authorization from '../../store/authorization';
import phonesStore from '../../store/phones';

export type PhoneStatusStep = PhoneStatus | 'in_remove_queue' | 'twofa';
export type ExtraEmailStatusStep = 'ok' | 'too_young' | 'in_remove_queue';

export default class InternalApiSteps {
	@step('"Протушить" все аттачи на написании письма')
	invalidateAllAttachesInCompose(messageId: string) {
		InternalApi.messagesAttachesInvalidate({
			email: authorization.account.get('email'),
			message_id: messageId
		});
	}

	@step('Добавить телефон для пользователя "{email}" с типом "{type}"')
	addPhone(storeIndex: number, email: string, type: PhoneStatusStep) {
		const phone: string = phonesStore.getNumber(storeIndex);

		const phoneId = InternalApi.usersPhonesAdd({
			email,
			phones: [{
				phone,
				mobile: true
			}]
		}).body[0];

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

	@step('Удалить телефон "{phone}" для пользователя "{email}"')
	removePhoneImmediately(id: string, email: string, phone: string) {
		return InternalApi.usersPhonesRemoveImmediately({ email, id }).body;
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

		userProfileSet({
			email: username,
			field: 'Emails',
			value: JSON.stringify(fieldEmails)
		});
	}

	@step('Установить для пользователя "{email}" поле профиля {field}={value}')
	setProfileField(email: string, field: string, value: string) {
		const response = userProfileSet({
			email,
			field,
			value
		});

		return response.body.body;
	}
}

export const internalApiSteps = new InternalApiSteps;
