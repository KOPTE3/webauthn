/** Набор полезных констант */

/**
 * Unicode characters
 * https://w3c.github.io/webdriver/webdriver-spec.html#character-types
 */
export enum UNICODE_CHARACTERS {
	'NULL' = '\uE000',
	'Cancel' = '\uE001',
	'Help' = '\uE002',
	'Backspace' = '\uE003',
	'Tab' = '\uE004',
	'Clear' = '\uE005',
	'Return' = '\uE006',
	'Enter' = '\uE007',
	'Shift' = '\uE008',
	'Control' = '\uE009',
	'Alt' = '\uE00A',
	'Pause' = '\uE00B',
	'Escape' = '\uE00C',
	'Space' = '\uE00D',
	'PageUp' = '\uE00E',
	'PageDown' = '\uE00F',
	'End' = '\uE010',
	'Home' = '\uE011',
	'Left' = '\uE012',
	'Up' = '\uE013',
	'Right' = '\uE014',
	'Down' = '\uE015',
	'Insert' = '\uE016',
	'Delete' = '\uE017',
	'Semicolon' = '\uE018',
	'Equals' = '\uE019',
	'Numpad 0' = '\uE01A',
	'Numpad 1' = '\uE01B',
	'Numpad 2' = '\uE01C',
	'Numpad 3' = '\uE01D',
	'Numpad 4' = '\uE01E',
	'Numpad 5' = '\uE01F',
	'Numpad 6' = '\uE020',
	'Numpad 7' = '\uE021',
	'Numpad 8' = '\uE022',
	'Numpad 9' = '\uE023',
	'Multiply' = '\uE024',
	'Add' = '\uE025',
	'Separator' = '\uE026',
	'Subtract' = '\uE027',
	'Decimal' = '\uE028',
	'Divide' = '\uE029',
	'F1' = '\uE031',
	'F2' = '\uE032',
	'F3' = '\uE033',
	'F4' = '\uE034',
	'F5' = '\uE035',
	'F6' = '\uE036',
	'F7' = '\uE037',
	'F8' = '\uE038',
	'F9' = '\uE039',
	'F10' = '\uE03A',
	'F11' = '\uE03B',
	'F12' = '\uE03C',
	'Command' = '\uE03D',
	'Meta' = '\uE03D',
	'ZenkakuHankaku' = '\uE040'
}

export default { UNICODE_CHARACTERS };

export function isValidButtonCode (code: string): code is UNICODE_CHARACTERS {
	return Object.keys(UNICODE_CHARACTERS)
		.some((key: string) => UNICODE_CHARACTERS[key as keyof typeof UNICODE_CHARACTERS] === code);
}
