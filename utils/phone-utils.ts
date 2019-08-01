import {
	bruteforceCounterReset,
	BruteforceType
} from '../api/internal';
import phonesStore, { Phone } from '../store/phones';

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
}
