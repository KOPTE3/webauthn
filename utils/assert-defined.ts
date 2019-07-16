export function assertDefinedValue<T>(value: T | undefined | null, message?: string): T | never {
	if (value) {
		return value;
	}

	throw new TypeError(message || `${value} is undefined`);
}
