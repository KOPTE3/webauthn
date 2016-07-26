'use strict';

let path = require('path');

let Steps = require('../../steps');
let LoginPage = require('../../steps/login');
let LoginForm = require('../../steps/login/form');
let accounts = require('../../store/authorization/accounts');
let providers = require('../../store/authorization/providers');

let GmailSteps = require('../../steps/oauth/gmail');
let gmailSteps = new GmailSteps();
let OutlookSteps = require('../../steps/oauth/outlook');
let outlookSteps = new OutlookSteps();
let loginForm = new LoginForm();

let { options = {
	name: 'Страница логина. Успешная авторизация локальными аккаунтами ' +
	'(при включенных внешних и отсутствии авторизованных пользователей)',
	query: {
		allow_external: 1
	}
}} = module.parent;

let suite = path.basename((module.parent.options ? module.parent : module).filename, '.js');

describe(suite + ': ' + options.name, () => {
	it('авторизация через gmail.com', () => {
		for (let { hosts } of providers.get(['gmail.com'])) {
			for (let host of hosts) {
				LoginPage.open({ allow_external: 1 });

				let { username, password } = accounts.get({
					provider: host,
					features: ['oauth']
				});

				// вписываем логин
				loginForm.setLogin(username);

				// нажимаем на кнопку продолжить
				loginForm.clickNextButton();

				// ожидаем урл гугловский
				gmailSteps.waitForUrl(/https:\/\/accounts.google.com\//);

				// ожидаем загрузки страницы
				GmailSteps.wait();

				// кнопка некст
				gmailSteps.clickNextBtn();

				GmailSteps.wait();

				// вписываем пароль
				gmailSteps.setPassword(password);

				gmailSteps.clickSignInBtn();

				Steps.isActiveUser(username, 2000);
				Steps.reload();
			}
		}
	});

	it('авторизация через outlook', () => {
		for (let { hosts } of providers.get(['outlook.com'])) {
			for (let host of hosts) {
				LoginPage.open({ allow_external: 1 });

				let { username, password } = accounts.get({
					provider: host,
					features: ['oauth']
				});

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
			}
		}
	});
});

