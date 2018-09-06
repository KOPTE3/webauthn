import * as InternalApi from '../../api/internal';
import authorization from '../../store/authorization';

export default class InternalApiSteps {
	@step('"Протушить" все аттачи на написании письма')
	invalidateAllAttachesInCompose(messageId: string) {
		InternalApi.messagesAttachesInvalidate({
			email: authorization.account.get('email'),
			message_id: messageId
		});
	}
}
