export default class WebAuthnMock {
	static mockCredentialsCreate(success: boolean) {
		browser.execute((success: boolean) => {
			navigator.credentials.create = (options: TemporaryAny) => {
				window.credentialsCreateArgs = options;

				return new Promise((resolve: TemporaryAny, reject: TemporaryAny) => {
					window.credentialsCreateResponse = success ? resolve : reject;
				});
			};
		}, success);
	}

	static mockCredentialsGet(success: boolean) {
		browser.execute((success: boolean) => {
			navigator.credentials.get = (options: TemporaryAny) => {
				window.credentialsGetArgs = options;

				return new Promise((resolve: TemporaryAny, reject: TemporaryAny) => {
					window.credentialsGetResponse = success ? resolve : reject;
				});
			};
		}, success);
	}
}
