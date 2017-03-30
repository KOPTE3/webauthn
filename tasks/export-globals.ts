import _deprecated from 'deprecated-decorator';

function NOOP (): void {
}

if (typeof global.deprecated !== 'function') {
	global.deprecated = _deprecated;
}

if (typeof global.step !== 'function') {
	global.step = NOOP;
}
