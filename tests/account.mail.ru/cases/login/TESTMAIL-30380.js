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
let vkSteps = new VkSteps();
let okSteps = new OkSteps();
let fbSteps = new FbSteps();

let socialStore = require('../../store/authorization/socials');

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
		let social = socialStore.get('vk.com')[0];

		LoginPage.open(options.query);

		let { username, password, login } = accounts.get({
			provider: social.name,
			features: ['oauth']
		});

		// кликаем на соцкнопку
		loginForm.clickSocialBtn('vk');

		// ожидаем урл вконтактский
		vkSteps.waitForUrl(social.url);

		// ожидаем загрузки страницы
		VkSteps.wait();

		// вводим логин пароль
		vkSteps.setLogin(login);
		vkSteps.setPassword(password);

		vkSteps.clickSignInBtn();

		Steps.isActiveUser(username, 4000);
		Steps.reload();
	});

	it('авторизация через ok.com', () => {
		let social = socialStore.get('ok.ru')[0];

		LoginPage.open(options.query);

		let { username, password, login } = accounts.get({
			provider: social.name,
			features: ['oauth']
		});

		// кликаем на соцкнопку
		loginForm.clickSocialBtn('ok');

		// ожидаем урл одноклассиноквский
		okSteps.waitForUrl(social.url);

		// ожидаем загрузки страницы
		OkSteps.wait();

		// вводим логин пароль
		okSteps.setLogin(login);
		okSteps.setPassword(password);

		okSteps.clickSignInBtn();

		Steps.isActiveUser(username, 4000);
		Steps.reload();
	});

	it('авторизация через fb.com', () => {
		let social = socialStore.get('fb.com')[0];

		LoginPage.open(options.query);

		let { username, password, login } = accounts.get({
			provider: social.name,
			features: ['oauth']
		});

		// кликаем на соцкнопку
		loginForm.clickSocialBtn('fb');

		// ожидаем урл фейсбучный
		fbSteps.waitForUrl(social.url);

		// ожидаем загрузки страницы
		FbSteps.wait();

		// вводим логин пароль
		fbSteps.setLogin(login);
		fbSteps.setPassword(password);

		fbSteps.clickSignInBtn();

		Steps.isActiveUser(username, 4000);
		Steps.reload();
	});
});

