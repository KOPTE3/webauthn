import _deprecated from 'deprecated-decorator';

function NOOP (): void {
}

if (!('deprecated' in global)) {
	global.deprecated = _deprecated;
}

if (!('step' in global)) {
	global.step = NOOP;
}
