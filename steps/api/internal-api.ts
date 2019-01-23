import * as InternalApi from '../../api/internal';
import authorization from '../../store/authorization';
import phonesStore from '../../store/phones';
import { PhoneStatus } from '../../api/internal/user/phones-state';

export default class InternalApiSteps {
	@step('"Протушить" все аттачи на написании письма')
	invalidateAllAttachesInCompose(messageId: string) {
		InternalApi.messagesAttachesInvalidate({
			email: authorization.account.get('email'),
			message_id: messageId
		});
	}

	@step('Добавить телефон для пользователя "{email}" с типом "{type}"')
	addPhone(storeIndex: number, email: string, type: PhoneStatus) {
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
}
