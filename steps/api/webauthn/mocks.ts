import {
	CreateAttestationForCredentialsCreateConfirm,
	CreateAssertionForCredentialsGetConfirm
} from '../../../utils/webauthn';
import {
	CredentialsCreateArgs,
	CredentialsGetArgs,
	AttestationForCredentialsCreateConfirm,
	AssertionForCredentialsGetConfirm
} from '../../../types/webauthn';

export default class WebAuthnMocks {
	@step('Подменяем navigator.credentials.create чтобы получить параметры, с которыми он будет вызван')
	static CredentialsCreateMock() {
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

	@step('Подменяем ответ navigator.credentials.create')
	static ReplaceCredentialsCreateResponse(success: boolean) {
		const fakeResponse = WebAuthnMocks.CreateCredentialsCreateResponse();

		WebAuthnMocks.SettleCredentialsCreate(fakeResponse, success);
	}

	// tslint:disable-next-line:max-line-length
	@step('Создаем фейковый ответ navigator.credentials.create c помощью полученных параметров')
	static CreateCredentialsCreateResponse() {
		let initialArguments: any;

		browser.waitUntil(() => {
			initialArguments = browser.execute(() => {
				return window.credentialsCreateArgs;
			}) as CredentialsCreateArgs;

			return Boolean(initialArguments.value);
		}, void 0, 'Не дождались аргументов navigator.credentials.create');

		const { attestation } = browser.waitForPromise(
			CreateAttestationForCredentialsCreateConfirm(initialArguments.value)
		);

		return attestation as AttestationForCredentialsCreateConfirm;
	}

	@step('Завершить вызов navigator.credentials.create с созданным ответом {success ? "SUCCESS" : "FAIL"}')
	static SettleCredentialsCreate(response: AttestationForCredentialsCreateConfirm, success: boolean) {
		browser.execute((response: AttestationForCredentialsCreateConfirm, success: boolean) => {
			if (success) {
				// переводим строки в ArrayBuffer
				response.rawId = window.base64ToArrayBuffer(response.rawId);
				response.response.attestationObject = window.base64ToArrayBuffer(response.response.attestationObject);
				response.response.clientDataJSON = window.base64ToArrayBuffer(response.response.clientDataJSON);

				window.credentialsCreateSuccess(response);
			} else {
				window.credentialsCreateFail();
			}
		}, response, success);
	}

	@step('Подменяем navigator.credentials.get чтобы получить параметры, с которыми он будет вызван')
	static CredentialsGetMock() {
		browser.execute(() => {
			navigator.credentials.get = (options) => {
				window.credentialsGetArgs = options;

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
					window.credentialsGetSuccess = resolve;
					window.credentialsGetFail = reject;
				});
			};
		});
	}

	// tslint:disable-next-line:max-line-length
	@step('Создаем фейковый ответ navigator.credentials.get c помощью полученных параметров')
	static CreateCredentialsGetResponse(privateKey: string, credentialIdString: string) {
		let initialArguments: any;

		browser.waitUntil(() => {
			initialArguments = browser.execute(() => {
				return window.credentialsGetArgs;
			}) as CredentialsGetArgs;

			return Boolean(initialArguments.value);
		}, void 0, 'Не дождались аргументов navigator.credentials.get');

		const { value: { publicKey } } = initialArguments;

		const assertionObject = browser.waitForPromise(
			CreateAssertionForCredentialsGetConfirm(publicKey, privateKey, credentialIdString)
		);

		return assertionObject as AssertionForCredentialsGetConfirm;
	}

	@step('Подменяем ответ navigator.credentials.get')
	static replaceCredentialsGetResponse(success: boolean, privateKey: string, credentialIdString: string) {
		const fakeResponse = WebAuthnMocks.CreateCredentialsGetResponse(privateKey, credentialIdString);

		WebAuthnMocks.SettleCredentialsGet(fakeResponse, success);
	}

	@step('Завершить вызов navigator.credentials.get с созданным ответом')
	static SettleCredentialsGet(response: AssertionForCredentialsGetConfirm, success: boolean) {
		browser.execute((response: AssertionForCredentialsGetConfirm, success: boolean) => {
			if (success) {
				// переводим строки в ArrayBuffer
				response.rawId = window.base64ToArrayBuffer(response.rawId);
				response.response.authenticatorData = window.base64ToArrayBuffer(response.response.authenticatorData);
				response.response.signature = window.base64ToArrayBuffer(response.response.signature);
				response.response.clientDataJSON = window.base64ToArrayBuffer(response.response.clientDataJSON);

				window.credentialsGetSuccess(response);
			} else {
				window.credentialsGetFail();
			}
		}, response, success);
	}
}
