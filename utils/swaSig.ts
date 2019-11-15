import config from '../config';
import * as crypto from 'crypto';

interface Obj { [key: string]: any; }

interface SwaSignatureParams {
	ClientID: string;
	SigTS: number;
	Sig: string;
}

interface ObjectWithSwaSignatureParams extends Obj, SwaSignatureParams {
}

function getSwaSignatureParams(query: Obj = {}): SwaSignatureParams {
	const queryCopy: Obj = {
		...query,
		ClientID: config.api.swaSig.ClientID,
		SigTS: Date.now()
	};

	const swaSig = crypto.createHash('md5').update(Object.keys(queryCopy).sort().map((key) => {
		return `${key}=${queryCopy[key as any]}`;
	}).join('') + config.api.swaSig.ClientSecret).digest('hex');

	return {
		ClientID: queryCopy.ClientID,
		SigTS: queryCopy.SigTS,
		Sig: swaSig
	};
}

export function addSwaSignatureParams(query: Obj = {}): ObjectWithSwaSignatureParams {
	const swaSignatureParams = getSwaSignatureParams(query);
	return { ...query,  ...swaSignatureParams };
}
