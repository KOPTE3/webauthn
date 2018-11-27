import { MailAPI as MailApiInterfaces } from '@qa/api';
import { getCaptchaValueByVariant } from '../../../utils/captcha';
import { getRandomStr } from '../../../utils/utils';
import * as MailApi from '../../../api/mail-api';
import * as InternalApi from '../../../api/internal';
import authorization from '../../../store/authorization';

export default class AliasSteps {
	@step('Добавляем алиас "{__result__}" в {!params.email && "текущий"} ' +
		'почтовый ящик {params.email ? " " + params.email : ""}')
	addAlias(params: MailApiInterfaces.AliasesAdd = {}): string {
		if (!params.alias) {
			params.alias = `test.box_${getRandomStr(22).toLowerCase()}@mail.ru`;
		}

		if (!params.email) {
			const { email } = authorization.account.data();
			params.email = email;
		}

		const result = InternalApi.aliasAdd({
			...params
		});

		if (result.status !== 200) {
			throw new Error(`Создание алиаса не удалось: ${JSON.stringify(result)}`);
		}

		return params.alias;
	}

	@step('Удаляем все алиасы из ящика')
	removeAllAliases() {
		const { body: aliases = [] } = MailApi.aliasesGet();

		aliases.forEach((alias: MailApi.Alias) => {
			const result = MailApi.aliasRemove(alias);

			if (result.status !== 200) {
				throw new Error(`Удаление алиаса не удалось: ${JSON.stringify(result)}`);
			}
		});
	}
}
