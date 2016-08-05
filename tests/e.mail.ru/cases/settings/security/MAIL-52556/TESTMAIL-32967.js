'use strict';

let all = require('..');

describe(() => {
	it('Двухфакторная авторизация. Проверка отображения содержимого ' +
		'в попапах включения 2-хф авторизации', () => {
		let user = all.userUtils.add({phones: 1});
		let {email: username, password} = user;

		all.Steps.auth('basic', {username, password});
		all.SecuritySteps.open();

		/* eslint-disable max-len */
		let text1 = 'Теперь при входе в почту с нового устройства потребуется ввод кода подтверждения из SMS или специального приложения.';

		/* eslint-enable */
		all.SecuritySteps.open2StepAuthPopup();
		all.SecuritySteps.check2StepAuthPopupDescription('enablePopup', text1);
		all.SecuritySteps.check2StepAuthPhoneField();

		/* eslint-disable max-len */
		let text2 = 'Для включения двухфакторной аутентификации введите текущий пароль и код, отправленный в SMS на номер';

		/* eslint-enable */
		all.SecuritySteps.contiune2StepAuthPopup();
		all.SecuritySteps.check2StepAuthPopupDescription('confirmPopup', text2);
		all.SecuritySteps.check2StepAuthCodeField();
		all.SecuritySteps.check2StepAuthPasswordField();
	});
});
