'use strict';

let AliasLayers = require('./');

let captchaUtils = require('../../../utils/captcha');

class AliasAdd extends AliasLayers {

	/**
	 * Локаторы
	 *
	 * @type {Object}
	 */
	get locators () {
		let container = '.is-aliases-add_in';
		let domainDropdownContainer = `${container} [data-blockid="email_select"]`;

		return this.extend(super.locators, {
			container,
			captcha: `${container} .js-captcha-img`,
			fields: {
				captcha: `${container} [name="capcha"]`,
				login: `${container} [data-blockid="email_name"]`
			},
			dropdowns: {
				domain: {
					ctrl: `${domainDropdownContainer} .b-dropdown__ctrl`,
					list: `${domainDropdownContainer} .b-dropdown__list`
				}
			}
		});
	}

	getCaptchaID () {
		let actual = captchaUtils.getCaptchaID(this.locators.captcha);

		return actual.value;
	}

	getCaptchaValue () {
		let cid = this.getCaptchaID();
		let code;

		this.page.waitUntil(function async () {
			return captchaUtils.getCaptchaValue(cid).then(result => {
				code = result;

				return true;
			});
		});

		return code;
	}
}

module.exports = AliasAdd;
