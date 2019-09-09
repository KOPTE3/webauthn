export default class WebAuthnMock {
	static mockCredentialsCreate(success: boolean) {
		browser.execute((success: boolean) => {
			navigator.credentials.create = (options: TemporaryAny) => {
				window.credentialsCreateArgs = options;

				const magicResult = options;
				// todo magic

				return success ? Promise.resolve(magicResult) : Promise.reject(magicResult);
			};
		}, success);
	}

	static mockCredentialsGet(success: boolean) {
		browser.execute((success: boolean) => {
			navigator.credentials.get = (options: TemporaryAny) => {
				window.credentialsGetArgs = options;

				const magicResult = options;
				// todo magic

				return success ? Promise.resolve(magicResult) : Promise.reject(magicResult);
			};
		}, success);
	}
}
