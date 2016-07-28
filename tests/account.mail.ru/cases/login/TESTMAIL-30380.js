'use strict';

let path = require('path');

let Steps = require('../../steps');
let LoginPage = require('../../steps/login');
let LoginForm = require('../../steps/login/form');
let accounts = require('../../store/authorization/accounts');
let providers = require('../../store/authorization/providers');
let VkSteps = require('../../steps/oauth/vk');
let OkSteps = require('../../steps/oauth/ok');
let FbSteps = require('../../steps/oauth/fb');

let loginForm = new LoginForm();

let providersStore = require('../../store/authorization/providers');

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
	[
		{
			name: 'vk.com',
			btn: 'vk',
			steps: new VkSteps()
		},
		{
			name: 'ok.ru',
			btn: 'ok',
			steps: new OkSteps()

		},
		{
			name: 'fb.com',
			btn: 'fb',
			steps: new FbSteps()

		}
	].forEach(function (item) {
		it(`авторизация через ${item.name}`, () => {
			let social = providersStore.get(item.name)[0];

			LoginPage.open(options.query);

			let { username, password, login } = accounts.get({
				provider: social.name,
				features: ['oauth']
			});

			// кликаем на соцкнопку
			loginForm.clickSocialBtn(item.btn);

			// авторизируемся
			item.steps.login(social.url, login, password);

			Steps.isActiveUser(username, 4000);
			Steps.reload();
		});
	});
});

