process.env.DEBUG = '@qa*';

import '../../lib';
import {KeyObject} from "crypto";
import * as rp from 'request-promise-native';
import {Cookie} from 'tough-cookie';
import config from '../../config';
import {ASAccount, CommonAccount, EmailType, Session, Type} from '../authorization';
import * as crypto from 'crypto';
import * as cbor from 'cbor';


// https://www.w3.org/TR/webauthn/#aaguid
const AAGUID: Buffer = crypto.randomBytes(16);
let counter = 0;

async function getCredentialsAsync(
	type: Type = 'regular',
	options: Partial<CommonAccount & EmailType> = {}
): Promise<ASAccount> {
	const qs = { ...options, type };

	const accountUrl = config.as.url;

	const response: ASAccount = await rp.get(`${accountUrl}/get`, {
		json: true,
		auth: config.as.auth,
		qs
	});

	response.username = response.email;
	return response;
}

const jar = rp.jar();

async function loginAccountAsync(credentials: CommonAccount): Promise<Session> {
	await rp({
		method: 'POST',
		uri: config.auth.login,
		headers: {
			'Referer': config.auth.referer,
			'User-Agent': config.auth.ua
		},
		followAllRedirects: false,
		qs: {
			Domain: credentials.domain,
			Login: credentials.login,
			Password: credentials.password,
			autotest: 1,
			mac: 1,
			page: 'https://account.test.mail.ru/login'
		},
		jar,
		simple: false,
		resolveWithFullResponse: true
	});

	await rp({
		method: 'GET',
		uri: 'https://auth.mail.ru/sdc?from=https%3A%2F%2Faccount.test.mail.ru%2Flogin',
		headers: {
			'Referer': config.auth.referer,
			'User-Agent': config.auth.ua
		},
		followAllRedirects: true,
		jar,
		simple: false,
		resolveWithFullResponse: true
	});

	const cookies: Cookie[] = jar.getCookies('https://account.test.mail.ru') as any;

	return {
		credentials: { ...credentials },
		cookies: cookies.map((cookie) => cookie.clone()) as any
	};
}


async function run() {
	const account = await getCredentialsAsync();
	const sess = await loginAccountAsync(account);

	console.log(sess);

	const {body: {body: token}} = await rp({
		method: 'POST',
		uri: 'https://account.test.mail.ru/api/v1/tokens',
		headers: {
			'Referer': config.auth.referer,
			'User-Agent': config.auth.ua
		},
		qs: {
			email: account.email,
		},
		jar,
		simple: true,
		json: true
	});

	const credentialsCreateResponse: any = await rp({
		method: 'POST',
		uri: 'https://account.test.mail.ru/api/v1/webauthn/credentials/create',
		headers: {
			'Referer': config.auth.referer,
			'User-Agent': config.auth.ua
		},
		jar,
		simple: true,
		json: {
			platform_type: 'cross-platform',
			email: account.email,
			token,
		},
		resolveWithFullResponse: false
	});

	// console.log(credentialsCreateResponse.toJSON());
	const {session_id, options} = credentialsCreateResponse.body;

	const relayingPatry: {
		id: string; // mail.ru
 		name: string; // Mail.ru Group
	} = options.publicKey.rp;

	const user = {
		displayName: options.publicKey.user.displayName as string,
		name: options.publicKey.user.name as string,
		id: Buffer.from(options.publicKey.user.id as string, 'base64' as BufferEncoding),
	};

	const challenge = Buffer.from(options.publicKey.challenge as string, 'base64' as BufferEncoding);

	// console.dir({
	// 	relayingPatry, user, challenge,
	// });

	// #### Регистрируем пользователя (создаём открытый/закрытый ключи) ####
	// see https://www.w3.org/TR/webauthn/#op-make-cred step 7
	const {publicKey, privateKey} = crypto.generateKeyPairSync(
		'ec',
		{
			namedCurve: 'prime256v1' // same that P-256 curve
		}
	);

	const CollectedClientData: CollectedClientDataType = await CreateCollectedClientData(
		challenge,
		'https://account.test.mail.ru', // <-- в конфиг
		'webauthn.create'
	);
	const CollectedClientDataHash: Buffer = await GetHashOfCollectedClientData(CollectedClientData);

	// используется только, чтобы сохранить взаимосвязь аккаунт <-> аутентификатор, но если аутентификатор одноразовый
	// для автотеста, то можно не сохранять
	const userHandle: Buffer = user.id;

	const credentialId: Buffer = crypto.randomBytes(16);


	const attestedCredentialData: Buffer = await CreateAttestedCredentialData(credentialId, publicKey);
	const authData: Buffer = await CreateAuthenticatorData(attestedCredentialData, counter);
	counter++; // увеличиваем счётчик при каждом "обращении" к аутентификатору
	const AttestationObject: Buffer = await GeneratingAnAttestationObject(authData, CollectedClientDataHash, privateKey);

	const ObjectPassedToWebauthnCredentialsCreateConfirm = {
		email: account.email,
		session_id,
		attestation: {
			type: 'public-key',
			id: credentialId.toString('base64'),
			rawId: credentialId.toString('base64'),
			response: {
				clientDataJSON: Buffer.from(CollectedClientData, 'utf8').toString('base64'),
				attestationObject: AttestationObject.toString('base64')
			}
		}
	};
	console.dir(ObjectPassedToWebauthnCredentialsCreateConfirm);

	const credentialsCreateConfirmResponse: any = await rp({
		method: 'POST',
		uri: 'https://account.test.mail.ru/api/v1/webauthn/credentials/create/confirm',
		headers: {
			'Referer': config.auth.referer,
			'User-Agent': config.auth.ua
		},
		json: ObjectPassedToWebauthnCredentialsCreateConfirm,
		jar,
		resolveWithFullResponse: true
	});

	console.log('credentialsCreateConfirmResponse');
	console.dir(credentialsCreateConfirmResponse.toJSON());

	await AuthThrowWebAuthn({
		email: account.email,
		privateKey,
		credentialId,
	});
}

async function AuthThrowWebAuthn({email, privateKey, credentialId}: any) {
	const clearJar = rp.jar();

	const credentialsGetResponse: any = await rp({
		method: 'POST',
		uri: 'https://account.test.mail.ru/api/v1/webauthn/credentials/get',
		headers: {
			'Referer': config.auth.referer,
			'User-Agent': config.auth.ua
		},
		jar: clearJar,
		simple: true,
		qs: {email},
		json: true,
	});

	// console.log(credentialsGetResponse.toJSON());


	// #### Авторизуем пользователя (используя ранее созданные открытый/закрытый ключи) ####
	// see https://www.w3.org/TR/webauthn/#GetAssn-DetermineRpId step 18
	const {session_id, options: {publicKey: publicKeyOptions}} = credentialsGetResponse.body;

	console.log('session_id is', session_id);
	console.log(publicKeyOptions);

	const challenge = Buffer.from(publicKeyOptions.challenge as string, 'base64' as BufferEncoding);
	const authData: Buffer = await CreateAuthenticatorData(null, counter);
	counter++; // увеличиваем счётчик при каждом "обращении" к аутентификатору

	const CollectedClientData: CollectedClientDataType = await CreateCollectedClientData(
		challenge,
		'https://account.test.mail.ru',
		'webauthn.get'
	);
	const CollectedClientDataHash: Buffer = await GetHashOfCollectedClientData(CollectedClientData);

	const assertionSignature: Buffer = await GenerateAnAssertionSignature(authData, CollectedClientDataHash, privateKey);

	const ObjectPassedToWebauthnCredentialsGetConfirm = {
		email,
		session_id,
		assertion: {
			type: 'public-key',
			id: credentialId.toString('base64'),
			rawId: credentialId.toString('base64'),
			response: {
				authenticatorData: authData.toString('base64'),
				signature: assertionSignature.toString('base64'),
				clientDataJSON: Buffer.from(CollectedClientData, 'utf8').toString('base64'),
			}
		}
	};

	console.dir(ObjectPassedToWebauthnCredentialsGetConfirm);

	const credentialsCreateConfirmResponse: any = await rp({
		method: 'POST',
		uri: 'https://account.test.mail.ru/api/v1/webauthn/credentials/get/confirm',
		headers: {
			'Referer': config.auth.referer,
			'User-Agent': config.auth.ua
		},
		json: ObjectPassedToWebauthnCredentialsGetConfirm,
		jar: clearJar,
		resolveWithFullResponse: true
	});

	console.log('credentialsCreateConfirmResponse');
	console.dir(credentialsCreateConfirmResponse.toJSON());

}

async function GenerateAnAssertionSignature(authData: Buffer, clientDataHash: Buffer, privateKey: KeyObject): Promise<Buffer> {
	return crypto.createSign('SHA256')
		.update(Buffer.concat([authData, clientDataHash]))
		.sign(privateKey);
}

type CollectedClientDataType = string;

// https://www.w3.org/TR/webauthn/#sec-client-data
async function CreateCollectedClientData(challenge: Buffer, origin: string, type: 'webauthn.create' | 'webauthn.get'): Promise<CollectedClientDataType> {
	return JSON.stringify({
		type,
		// url safe base64 encoding
		challenge: challenge.toString('base64')
			.replace(/\+/g, '-')
			.replace(/\//g, '_')
			.replace(/=+$/g, ''),
		origin,
	});
}

async function GetHashOfCollectedClientData(clientData: CollectedClientDataType): Promise<Buffer> {
	// This is the hash (computed using SHA-256) of the JSON-serialized client data, as constructed by the client.
	return crypto.createHash('sha256').update(clientData, 'utf8').digest();
}

// https://www.w3.org/TR/webauthn/#sec-attested-credential-data
async function CreateAttestedCredentialData(credentialId: Buffer, publicKey: KeyObject): Promise<Buffer> {
	const credentialIdLength = Buffer.alloc(2);
	credentialIdLength.writeUInt16BE(credentialId.byteLength, 0);

	// https://crypto.stackexchange.com/questions/66982/how-can-you-derive-a-p-256-public-key-from-the-x-and-y-points
	const der = publicKey.export({
		type: 'spki',
		format: 'der'
	});

	const x = der.subarray(27, 27 + 32);
	const y = der.subarray(27 + 32, 27 + 32 + 32);

	// https://www.w3.org/TR/webauthn/#sctn-encoded-credPubKey-examples
	const CoseCredentialPublicKey = new Map();
	CoseCredentialPublicKey.set(1, 2);
	CoseCredentialPublicKey.set(3, -7);
	CoseCredentialPublicKey.set(-1, 1);
	CoseCredentialPublicKey.set(-2, x);
	CoseCredentialPublicKey.set(-3, y);

	const CborCoseCredentialPublicKey = cbor.encode(CoseCredentialPublicKey);

	return Buffer.concat([AAGUID, credentialIdLength, credentialId, CborCoseCredentialPublicKey]);
}

// https://www.w3.org/TR/webauthn/#sec-authenticator-data
async function CreateAuthenticatorData(attestedCredentialData: Buffer | null, counter: number = 0): Promise<Buffer> {
	const rpIdHash = crypto.createHash('sha256').update('mail.ru', 'utf8').digest();

	const flags = new Uint8Array(1);
	if (attestedCredentialData) {
		flags[0] = 0b01000101;
	} else {
		flags[0] = 0b00000101;
	}
	const signCount = Buffer.alloc(4);
	signCount.writeUInt32BE(counter, 0);
	if (attestedCredentialData) {
		return Buffer.concat([rpIdHash, flags, signCount, attestedCredentialData]);
	} else {
		return Buffer.concat([rpIdHash, flags, signCount]);
	}
}

// https://www.w3.org/TR/webauthn/#generating-an-attestation-object
async function GeneratingAnAttestationObject(authData: Buffer, hash: Buffer, privateKey: KeyObject): Promise<Buffer> {
	const concated = Buffer.concat([authData, hash]);

	const sign = crypto.createSign('sha256');
	sign.write(concated);
	sign.end();
	const sig = sign.sign(privateKey);
	const attStmt = {
		alg: -7,
		sig,
	};

	const fmt = 'packed';


	return cbor.encode({
		fmt,
		attStmt,
		authData,
	})
}


run()
	.then(() => console.log('Finish'), console.error);
