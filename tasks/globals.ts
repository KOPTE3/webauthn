import deprecated from 'deprecated-decorator';

if (typeof global.deprecated !== 'function') {
	global.deprecated = deprecated;
}

if (typeof global.step !== 'function') {
	global.step = () => {};
}
