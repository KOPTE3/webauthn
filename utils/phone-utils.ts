/* tslint:disable:no-var-keyword */
import { tokensSendAsync } from '../api/mail-api';
import {
	bruteforceCounterReset,
	BruteforceType,
	tokensInfo
} from '../api/internal';
import phonesStore, { Phone } from '../store/phones';
import { assertDefinedValue } from './assert-defined';

export default class PhonesUtils {
	static GetPhoneNumber(index?: number): string {
		return PhonesUtils.GetPhone(index).phone;
	}

	static GetPhone(index?: number): Phone {
		const phone = phonesStore.getPhone(index);

		bruteforceCounterReset({
			type: BruteforceType.sms,
			key: phone.phone
		});

		return phone;
	}

	static GetCallUIPhone(index?: number): Phone {
		const phone = phonesStore.getCalluiPhone(index);

		bruteforceCounterReset({
			type: BruteforceType.sms,
			key: phone.phone
		});

		return phone;
	}

	static GetOnlyCallUIPhone(index?: number): Phone {
		const phone = phonesStore.getOnlyCalluiPhone(index);

		bruteforceCounterReset({
			type: BruteforceType.sms,
			key: phone.phone
		});

		return phone;
	}

	static GetMiddlePhoneNumbers(phone: string): string {
		return phone.substr(5, 2);
	}

	static GetRegTokenId(): string {
		const regTokenId = browser.executeAsync(
			function(done) {
				try {
					// tslint:disable-next-line:prefer-const
					var view = (window as any).application.activeUnits.find(function(unit: any) {
						return unit.id === 'user-phones-bind';
					});
					done(view.auth.reg_token.id);
				} catch (e) {
					done();
				}
			}
		);

		if (!regTokenId.value) {
			throw new Error('Не удалось получить RegTokenId');
		}

		return regTokenId.value;
	}

	static GetTokenCode(email: string): {code: string; transport: string} {
		const id = PhonesUtils.GetRegTokenId();

		const info = tokensInfo({ email, id });
		const { code, transport } = assertDefinedValue(info.body);

		return { code, transport };
	}

	static EmulateBruteforce(opts: {email: string; phone: string}): void {
		const id = PhonesUtils.GetRegTokenId();

		browser.waitUntil(async () =>  {
			const result = await tokensSendAsync({
				email: opts.email,
				reg_token: {
					id,
					address: opts.phone,
					target: 'user/phones/bind',
					format: 'default',
					transport: 'phone'
				}
			});
			const response = assertDefinedValue(result.response);

			return response.body && response.body.status === 429;
		}, 30000, `Не удалось достигнуть лимита на отправку SMS с номера ${opts.phone}`, 5000);
	}
}
