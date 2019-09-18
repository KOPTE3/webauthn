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

	@step('Подменяем ответ navigator.credentials.create')
	static replaceCredentialsCreateResponse(success: boolean) {
		const fakeResponse = WebAuthnMocks.createCredentialsCreateResponse();

		WebAuthnMocks.settleCredentialsCreate(fakeResponse, success);
	}

	// tslint:disable-next-line:max-line-length
	@step('Создаем фейковый ответ {success ? "SUCCESS" : "FAIL"} navigator.credentials.create c помощью полученных параметров')
	static createCredentialsCreateResponse() {
		let initialArguments: any;

		browser.waitUntil(() => {
			initialArguments = browser.execute(() => {
				return window.credentialsCreateArgs;
			}) as CredentialsCreateArgs;

			return Boolean(initialArguments.value);
		});

		const { attestation } = browser.waitForPromise(
			CreateAttestationForCredentialsCreateConfirm(initialArguments.value)
		);

		return attestation as AttestationForCredentialsCreateConfirm;
	}

	@step('Завершить вызов navigator.credentials.create с созданным ответом')
	static settleCredentialsCreate(response: AttestationForCredentialsCreateConfirm, success: boolean) {
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
	static credentialsGetMock() {
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
	@step('Создаем фейковый ответ {success ? "SUCCESS" : "FAIL"} navigator.credentials.get c помощью полученных параметров')
	static createCredentialsGetResponse(email: string, credentialIdString: string) {
		let initialArguments: any;

		browser.waitUntil(() => {
			initialArguments = browser.execute(() => {
				return window.credentialsGetArgs;
			}) as CredentialsGetArgs;

			return Boolean(initialArguments.value);
		});

		const { value: { publicKey } } = initialArguments;
		console.log('initialArguments', initialArguments);

		const assertionObject = browser.waitForPromise(
			CreateAssertionForCredentialsGetConfirm(publicKey, credentialIdString, email)
		);

		return assertionObject as AssertionForCredentialsGetConfirm;
	}

	@step('Подменяем ответ navigator.credentials.get')
	static replaceCredentialsGetResponse(success: boolean, email: string, credentialIdString: string) {
		const fakeResponse = WebAuthnMocks.createCredentialsGetResponse(email, credentialIdString);

		WebAuthnMocks.settleCredentialsGet(fakeResponse, success);
	}

	@step('Завершить вызов navigator.credentials.get с созданным ответом')
	static settleCredentialsGet(response: AssertionForCredentialsGetConfirm, success: boolean) {
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
