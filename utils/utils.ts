export function lcFirst(input: string): string {
	return input[0].toLowerCase() + input.slice(1);
}

export function getRandomStr(length: number): string {
	const possibleChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	let text = '';

	for (let i = 0; i < length; i++) {
		text += possibleChars.charAt(Math.floor(Math.random() * possibleChars.length));
	}

	return text;
}
