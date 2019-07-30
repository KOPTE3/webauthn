export function assertDefinedValue<T>(value: T | undefined | null, message?: string): T | never {
	if (value === null || typeof value === 'undefined') {
		throw new TypeError(message || `${value} is undefined`);
	}

	return value;
}
