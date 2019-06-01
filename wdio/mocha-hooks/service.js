const debug = require('debug')('@qa:yoda');

module.exports = {
	before() {
		// Monkey patching функции в mocha, которая используется пакетом wdio-mocha-framework
		// Так сложно из-за того, что у нас в node_modules есть несколько копий пакета mocha
		const wdioMochaFrameworkPath = require.resolve('wdio-mocha-framework');
		const paths = require.cache[wdioMochaFrameworkPath];
		const wdioMochaFrameworkMochaPath = require.resolve('mocha', {paths});

		debug('@qa/yoda/wdio/mocha-hooks/service patches ' + wdioMochaFrameworkMochaPath);

		const OriginalMochaConstructor = require(wdioMochaFrameworkMochaPath);

		OriginalMochaConstructor.prototype.loadFiles = function(fn) {
			const self = this;
			const suite = this.suite;

			this.files.forEach(function(file) {
				file = require.resolve(file, {paths});
				suite.emit('pre-require', global, file, self);
				let requiredValue = null;
				try {
					requiredValue = require(file);
				} catch (e) {
					global.describe(function () {
						global.it(file, function () {
							throw e;
						});
					});
				}

				suite.emit('require', requiredValue, file, self);
				suite.emit('post-require', global, file, self);
			});
			fn && fn();
		};

	}
};
