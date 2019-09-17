import * as crypto from 'crypto';
import { CreatedCredentials } from '../../../api/mail-api/webauthn/create';
import * as cbor from 'cbor';
import * as Debug from 'debug';

const debug = Debug('@qa:yoda:webauthn-fakes');

export interface CreateCredentialsArguments {
	sessionId: string;
	value: {
		publicKey: CreatedCredentials;
	};
}

export interface CreateCredentialsResponse {
	id: string;
	rawId: string | ArrayBuffer;
	response: {
		clientDataJSON: string | ArrayBuffer;
		attestationObject: string | ArrayBuffer;
	};
	type: string;
}

// https://www.w3.org/TR/webauthn/#aaguid
const AAGUID: Buffer = crypto.randomBytes(16);
let counter = 0;

type CollectedClientDataType = string;

// https://www.w3.org/TR/webauthn/#sec-client-data
// tslint:disable-next-line:max-line-length
async function CreateCollectedClientData(
	challenge: Buffer,
	origin: string,
	type: 'webauthn.create' | 'webauthn.get'
): Promise<CollectedClientDataType> {
	return JSON.stringify({
		type,
		// url safe base64 encoding
		challenge: challenge.toString('base64')
			.replace(/\+/g, '-')
			.replace(/\//g, '_')
			.replace(/=+$/g, ''),
		origin
	});
}

async function GetHashOfCollectedClientData(clientData: CollectedClientDataType): Promise<Buffer> {
	// This is the hash (computed using SHA-256) of the JSON-serialized client data, as constructed by the client.
	return crypto.createHash('sha256').update(clientData, 'utf8').digest();
}

// tslint:disable-next-line:max-line-length
async function GenerateAnAssertionSignature(authData: Buffer, clientDataHash: Buffer, privateKey: string): Promise<Buffer> {
	return crypto.createSign('SHA256')
		.update(Buffer.concat([authData, clientDataHash]))
		.sign(privateKey);
}

async function CreateAttestedCredentialData(
	credentialId: Buffer,
	publicKey: Buffer
): Promise<Buffer> {
	const credentialIdLength = Buffer.alloc(2);
	credentialIdLength.writeUInt16BE(credentialId.byteLength, 0);

	const x = publicKey.subarray(27, 27 + 32);
	const y = publicKey.subarray(27 + 32, 27 + 32 + 32);

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
async function CreateAuthenticatorData(
	attestedCredentialData: Buffer | null, counter: number = 0
): Promise<Buffer> {
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
async function GeneratingAnAttestationObject(
	authData: Buffer,
	hash: Buffer,
	privateKey: string
): Promise<Buffer> {
	const concated = Buffer.concat([authData, hash]);

	const sign = crypto.createSign('sha256');
	sign.write(concated);
	sign.end();
	const sig = sign.sign(privateKey);
	const attStmt = {
		alg: -7,
		sig
	};

	const fmt = 'packed';

	return cbor.encode({
		fmt,
		attStmt,
		authData
	});
}

export async function createResponse(params: CreateCredentialsArguments): Promise<CreateCredentialsResponse> {
	const { value: options } = params;
	const user = {
		displayName: options.publicKey.user.displayName as string,
		name: options.publicKey.user.name as string,
		id: Buffer.from(options.publicKey.user.id as string, 'base64' as BufferEncoding)
	};
	const challenge = Buffer.from(options.publicKey.challenge as string, 'base64' as BufferEncoding);

	// #### Регистрируем пользователя (создаём открытый/закрытый ключи) ####
	// see https://www.w3.org/TR/webauthn/#op-make-cred step 7
	// Используем node 10.16.3 и получаем publicKey: Buffer, privateKey: string
	debug('generating a key pair');
	const { publicKey, privateKey } = crypto.generateKeyPairSync(
		'ec',
		{
			namedCurve: 'prime256v1', // same that P-256 curve
			publicKeyEncoding:  { type: 'spki', format: 'der' },
			privateKeyEncoding: { type: 'sec1', format: 'pem' }
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

	debug('creating an attestation object');
	const AttestationObject: Buffer = await GeneratingAnAttestationObject(authData, CollectedClientDataHash, privateKey);

	const fakeResponse: CreateCredentialsResponse = {
		id: credentialId.toString('base64'),
		rawId: credentialId.toString('base64'),
		response: {
			clientDataJSON: Buffer.from(CollectedClientData, 'utf8').toString('base64'),
			attestationObject: AttestationObject.toString('base64')
		},
		type: 'public-key'
	};

	debug('fake response of navigator.credentials.create: ', fakeResponse);

	return fakeResponse;
}
