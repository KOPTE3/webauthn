import * as InternalApi from '../../api/internal';
import authorization from '../../store/authorization';
import phonesStore from '../../store/phones';

export default class InternalApiSteps {
	@step('"Протушить" все аттачи на написании письма')
	invalidateAllAttachesInCompose(messageId: string) {
		InternalApi.messagesAttachesInvalidate({
			email: authorization.account.get('email'),
			message_id: messageId
		});
	}

	@step('Добавить телефон для пользователя "{email}" с типом "{type}"')
	addPhone(storeIndex: number, email: string, type: 'ok' | 'too_young' | 'nonverified') {
		const phone: string = phonesStore.getNumber(storeIndex);

		const phoneId = InternalApi.usersPhonesAdd({
			email,
			phones: [{
				phone,
				mobile: true
			}]
		}).body[0];

		InternalApi.userPhonesState({ email, phone, state: type });

		return phoneId;
	}
}
