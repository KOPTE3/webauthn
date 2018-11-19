import * as MailApi from '../../../api/mail-api';
import { MailAPI as MailApiInterfaces } from '@qa/api/index';
import MailApiSteps from '../mail-api';
import foldersStore from '../../../store/folders';
import { getCaptchaValueByVariant } from '../../../utils/captcha';
import { getRandomStr } from '../../../utils/utils';

export default class CollectorSteps {
	@step('Добавляем коллектор "{params.email}" в почтовый ящик')
	addCollector(account: {email: string, password: string}, createFolder: boolean = false) {
		const mailApiSteps = new MailApiSteps();
		const params: MailApiInterfaces.CollectorsAdd = {
			collect: [
				{
					email: account.email,
					password: account.password
				}
			]
		};

		if (createFolder) {
			const folders = mailApiSteps.createFolders([
				{
					name: account.email,
					parent: String(foldersStore.ids.root)
				}
			]);

			params.collect[0].folder = folders[0];
		}

		const result = MailApi.collectorsAdd(params);

		if (result.status !== 200) {
			throw new Error(`Создание коллектора не удалось: ${JSON.stringify(result)}`);
		}

		return result;
	}

	@step('Удаляем все коллекторы из ящика')
	removeAllCollectors(): void {
		const { body: collectors } = MailApi.collectorsGet();

		const result = MailApi.collectorsRemove({
			collect: collectors.map((item) => ({ id: item.id }))
		});

		if (result.status !== 200) {
			throw new Error(`Удаление коллекторов не удалось: ${JSON.stringify(result)}`);
		}
	}
}
