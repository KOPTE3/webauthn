'use strict';

let path = require('path');

let Steps = require('../../steps');
let LoginPage = require('../../steps/login');
let LoginForm = require('../../steps/login/form');
let Vk = require('../../steps/oauth/vk');
let Ok = require('../../steps/oauth/ok');
let Fb = require('../../steps/oauth/fb');
let accounts = require('../../store/authorization/accounts');
let providers = require('../../store/authorization/providers');

let loginForm = new LoginForm();

let { options = {
	name: 'Страница логина. Авторизация соц. аккаунтами ' +
		'при отсутствии ранее авторизованных пользователей',
	auth: false
}} = module.parent;

describe(options.name, () => {
	let services = [ new Vk(), new Ok(), new Fb() ];

	for (let service of services) {
		it(`Авторизация через ${service.provider}`, () => {
			let social = providers.get(service.provider)[0];

			if (options.auth) {
				LoginPage.auth();
			}

			LoginPage.open({
				vk: 1,
				fb: 1,
				ok: 1
			});

			let { username, password, login } = accounts.get({
				provider: social.name,
				features: ['oauth']
			});

			loginForm.clickSocialBtn(service.provider);
			service.login(social.url, login, password);

			Steps.isActiveUser(username, 4000);
			Steps.reload();
		});
	}
});

