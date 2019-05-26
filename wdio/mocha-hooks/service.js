const debug = require('debug')('@qa:yoda');

module.exports = {
	before() {
		debug('@qa/yoda/wdio/mocha-hooks/service called');

		OriginalMochaConstructor.prototype.loadFiles = function(fn) {
			const self = this;
			const suite = this.suite;

			this.files.forEach(function(file) {
				file = require.resolve(file, {paths: require.cache[wdioMochaFrameworkMochaPath].paths});
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
