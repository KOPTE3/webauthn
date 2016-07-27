'use strict';

let path = require('path');

let Steps = require('../../steps');
let LoginPage = require('../../steps/login');
let LoginForm = require('../../steps/login/form');
let accounts = require('../../store/authorization/accounts');
let providers = require('../../store/authorization/providers');


let loginForm = new LoginForm();

let { options = {
	name: 'Account. Страница логина. Авторизация соц. аккаунтами (вк/ок/фб) ' +
	'при отсутствии ранее авторизованных пользователей',
	query: {
		vk: 1,
		fb: 1,
		ok: 1
	}
}} = module.parent;

let suite = path.basename((module.parent.options ? module.parent : module).filename, '.js');

describe(suite + ': ' + options.name, () => {
	it('авторизация через vk.com', () => {
		const host = 'vk.com';

		LoginPage.open(options.query);

		let { username, password } = accounts.get({
			provider: host,
			features: ['oauth']
		});

		console.log(username, password);


		return;
		browser.debug();

		// вписываем логин
		loginForm.setLogin(username);
		// нажимаем на кнопку продолжить

		loginForm.clickNextButton();

		// ожидаем урл гугловский
		outlookSteps.waitForUrl(new RegExp('https://login.live.com/oauth20_authorize.srf'));
		// ожидаем загрузки страницы
		OutlookSteps.wait();

		// вписываем пароль
		outlookSteps.setPassword(password);

		outlookSteps.clickSignInBtn();

		// делаем побольше таймаут, оутлук очень долго отрабатывает
		Steps.isActiveUser(username, 4000);
		Steps.reload();
	});
});

