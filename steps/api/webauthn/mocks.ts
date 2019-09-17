import {
	createResponse,
	CreateCredentialsArguments,
	CreateCredentialsResponse
} from '../../../utils/webauthn/fakes/createResponse';

export default class WebAuthnMocks {
	@step('Подменяем navigator.credentials.create чтобы получить параметры, с которыми он будет вызван')
	static credentialsCreateMock() {
		browser.execute(() => {
			navigator.credentials.create = (options) => {
				window.credentialsCreateArgs = options;

				window.base64ToArrayBuffer = (base64: string) => {
					const binaryString = atob(base64);
					const length = binaryString.length;
					const bytes = new Uint8Array(length);

					for (let i = 0; i < length; i++) {
						bytes[i] = binaryString.charCodeAt(i);
					}

					return bytes.buffer;
				};

				return new Promise((resolve: TemporaryAny, reject: TemporaryAny) => {
					window.credentialsCreateSuccess = resolve;
					window.credentialsCreateFail = reject;
				});
			};
		});
	}

	// tslint:disable-next-line:max-line-length
	@step('Создаем фейковый ответ {success ? "SUCCESS" : "FAIL"} navigator.credentials.create c помощью полученных параметров')
	static createCredentialsCreateResponse() {
		const initialArguments: any = browser.execute(() => {
			return window.credentialsCreateArgs;
		});

		return browser.waitForPromise(
			createResponse(initialArguments as CreateCredentialsArguments)
		) as CreateCredentialsResponse;
	}

	@step('Завершить вызов navigator.credentials.create с созданным ответом')
	static settleCredentialsCreate(response: CreateCredentialsResponse, success: boolean) {
		browser.execute((response: CreateCredentialsResponse, success: boolean) => {

			// переводим строки в ArrayBuffer
			response.rawId = window.base64ToArrayBuffer(response.rawId);
			response.response.attestationObject = window.base64ToArrayBuffer(response.response.attestationObject);
			response.response.clientDataJSON = window.base64ToArrayBuffer(response.response.clientDataJSON);

			if (success) {
				window.credentialsCreateSuccess(response);
			} else {
				window.credentialsCreateFail(response);
			}
		}, response, success);
	}

	@step('Подменяем ответ navigator.credentials.create')
	static replaceCredentialsCreateResponse(success: boolean) {
		const fakeResponse = WebAuthnMocks.createCredentialsCreateResponse();

		WebAuthnMocks.settleCredentialsCreate(fakeResponse, success);
	}
}
