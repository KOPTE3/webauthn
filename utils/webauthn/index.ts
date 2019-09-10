// todo: реализовать реальный метод
const magic = (options: any) => options;

export default class WebAuthnMock {
	@step('Подменяем браузерный credentials.create чтобы получить параметры, с которыми он будет вызван')
	static credentialsCreateMock(success: boolean) {
		browser.execute((success: boolean) => {
			navigator.credentials.create = (options: TemporaryAny) => {
				window.credentialsCreateArgs = options;

				return new Promise((resolve: TemporaryAny, reject: TemporaryAny) => {
					window.credentialsCreateResponse = success ? resolve : reject;
				});
			};
		}, success);
	}

	@step('Подменяем браузерный credentials.get чтобы получить параметры, с которыми он будет вызван')
	static credentialsGetMock(success: boolean) {
		browser.execute((success: boolean) => {
			navigator.credentials.get = (options: TemporaryAny) => {
				window.credentialsGetArgs = options;

				return new Promise((resolve: TemporaryAny, reject: TemporaryAny) => {
					window.credentialsGetResponse = success ? resolve : reject;
				});
			};
		}, success);
	}

	static settleCredentialsCreate(response: TemporaryAny) {
		browser.execute((response: TemporaryAny) => {
			window.credentialsCreateResponse(response);
		}, response);
	}

	static settleCredentialsGet(response: TemporaryAny) {
		browser.execute((response: TemporaryAny) => {
			window.credentialsGetResponse(response);
		}, response);
	}

	@step('Подменяем ответ браузерного credentials.create')
	static replaceCredentialsCreateResponse() {
		const initalArgumetns = browser.execute(() => {
			return window.credentialsCreateArgs;
		});

		const { publicKey } = initalArgumetns.value;

		publicKey.challenge = Buffer.from(publicKey.challenge, 'base64')
			.toString('base64');
		publicKey.user.id = Buffer.from(publicKey.user.id, 'base64')
			.toString('base64');

		initalArgumetns.value.publicKey = publicKey;
		// todo доделать и вынести в отдельную функцию

		// WebAuthnMock.settleCredentialsCreate(magic(options));
	}

	@step('Подменяем ответ браузерного credentials.get')
	static replaceCredentialsGetResponse() {
		const options: any = browser.execute(() => {
			return window.credentialsGetArgs;
		});

		WebAuthnMock.settleCredentialsGet(magic(options));
	}
}
