import { MailAPI as MailApiInterfaces } from '@qa/api';
import { getCaptchaValueByVariant } from '../../../utils/captcha';
import { getRandomStr } from '../../../utils/utils';
import * as MailApi from '../../../api/mail-api';

export default class AliasSteps {
	@step('Добавляем алиас {__result__} в почтовый ящик')
	addAlias(params: MailApiInterfaces.AliasesAdd = {}): string {
		const code = getCaptchaValueByVariant('1');

		if (!params.alias) {
			params.alias = `test.box_${getRandomStr(22).toLowerCase()}@mail.ru`;
		}

		const result = MailApi.aliasAdd({
			capcha: code,
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

		aliases.map((alias: MailApi.Alias) => {
			MailApi.aliasRemove(alias);
		});
	}
}
