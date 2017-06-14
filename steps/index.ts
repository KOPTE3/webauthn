import * as assert from 'assert';
import { Credentials, RegisterOptions } from '@qa/account-manager';
import URL from '../utils/url';
import Page, {Query} from '../pages';
import account from '../utils/account';

let page = new Page();

/**
 * @class Steps
 */
class Steps {
	/**
	 * TODO: нужно проработать концепцию по удалению статических свойств
	 * и уходу от использования this.page
	 */
	static page: Page = page;
	page: Page = page;

	/**
	 * Авторизация
	 *
	 * @param {string} [type] — тип авторизации
	 * @param {AccountManager.Credentials} [credentials] — авторизационные данные
	 */
	@step('Авторизация пользователем "{__result__.username}"')
	static auth (type?: string, credentials?: Credentials): Credentials {
		return Page.auth(type, credentials);
	}

	/**
	 * Получить заголовок страницы
	 */
	@step('Получить текущий заголовок страницы')
	title () {
		return browser.getTitle();
	}

	/**
	 * Разлогинизация,
	 * если не передать email то берется текущий аккаунт
	 *
	 * @param {string} email
	 * @param {number} timeout
	 */
	@step('Разлогиниться')
	logout (email?: string, timeout?: number) {
		return account.logout(email, timeout);
	}

	/**
	 * Регистрация пользователя
	 *
	 * @param {string} [type] — тип авторизации
	 * Из-за отсутствия других реализаций пока не используется, но зарезервирован
	 * @param {Object} [options] — авторизационые данные
	 * @returns {AccountManager.Credentials}
	 */
	@step('Создать нового пользователя')
	static register (type?: string, options: RegisterOptions = {}): Credentials {
		return account.register(type, options);
	}

	/**
	 * Открыть страницу
	 *
	 * @param {string|Query} [path]
	 * @param {Object} [query]
	 * @see Page.open
	 */
	@step('Открыть страницу "{__result__.url}"')
	static open (path?: string | Query, query?: Query): { state: boolean, url: string } {
		let actual = this.page.open(path, query);

		// Игнорируем обращения к локаторам если исключение возникает
		// до вызова степа в самом тесте.
		try {
			if (!this.page.locators.container) {
				throw new Error('container');
			}
		} catch (error) {
			let { name = '' } = this;

			let message = `"${name}" не определен основной элемент страницы 
в "pages/<page>/locators.container"`;

			assert.equal(error.name, 'container', message);
		}

		this.page.wait();

		assert(actual.state, 'Не удалось авторизоваться');

		return actual;
	}

	/**
	 * Проверяет залогинен ли пользователь
	 *
	 * @deprecated
	 * @see isActiveUser
	 * @param {string} [email]
	 * @param {number} [timeout]
	 * @returns {boolean}
	 */
	@deprecated('Use a non-static method')
	@step('Проверить что пользователь авторизован')
	static isActiveUser (email: string, timeout?: number): boolean {
		return account.isActiveUser(email, timeout);
	}

	/**
	 * Проверяет залогинен ли пользователь
	 *
	 * @param {string} [email]
	 * @param {number} [timeout]
	 */
	@step('Проверить что пользователь авторизован')
	isActiveUser (email: string, timeout?: number): boolean {
		return Steps.isActiveUser(email, timeout);
	}

	/**
	 * @deprecated
	 * @see wait
	 */
	@deprecated('Use a non-static method')
	@step(`Дождаться загрузки страницы`)
	static wait (locator?: string, ms?: number, reverse: boolean = false): void {
		this.page.wait(locator, ms, reverse);
	}

	/**
	 * Дождатся загрузки страницы
	 */
	@step(`Дождаться загрузки страницы`)
	wait (locator?: string, ms?: number, reverse: boolean = false) {
		this.page.wait(locator, ms, reverse);
	};

	/**
	 * Локаторы
	 *
	 * @param {string[]} list — список фич, которые требуется включить
	 */
	@step('Включение фич {__result__}')
	static features (list: string[]): string[] {
		return page.features(list);
	}

	/**
	 * Скрипты, выполняемые сразу после page.url
	 */
	@step('Включение произвольных скриптов {__result__}')
	static inject (list: string[]): string[] {
		return page.inject(list);
	}

	/**
	 * Откладывает выполнение следюущего шага на заданное время
	 *
	 * @deprecated
	 * @param {number} ms
	 * @see pause
	 */
	@deprecated('Use a non-static method')
	@step('Установить паузу "{ms}ms"')
	static pause (ms: number) {
		browser.pause(ms);
	};

	/**
	 * Откладывает выполнение следюущего шага на заданное время
	 *
	 * @param {number} ms
	 */
	@step('Установить паузу "{ms}ms"')
	pause (ms: number) {
		browser.pause(ms);
	}

	/**
	 * @deprecated
	 * @see refresh
	 * @param {Object} query
	 */
	@deprecated('Use a non-static method')
	@step(`Обновить текущую страницу`)
	static refresh (query: Query = {}) {
		page.refresh(query);
	};

	/**
	 * Перезагружает текущую страницу
	 *
	 * @param {Object} [query] — параметры запроса
	 */
	@step(`Обновить текущую страницу`)
	refresh (query: Query = {}) {
		page.refresh(query);
	};

	/**
	 * Принять alert
	 *
	 * @deprecated
	 * @see alertAccept
	 */
	@deprecated('Use a non-static method')
	@step('Принять алерт')
	static alertAccept () {
		browser.alertAccept();
	};

	/** Принять алерт */
	@step('Принять алерт')
	alertAccept () {
		browser.alertAccept();
	}

	/**
	 * Получить текст alert'a
	 *
	 * @deprecated
	 * @see getAlertText
	 * @returns {string}
	 */
	@deprecated('Use a non-static method')
	@step('Получить текст алерта')
	static getAlertText (text?: string) {
		browser.alertText(text);
	}

	/**
	 * Получить текст алерта
	 *
	 * @returns {string}
	 */
	@step('Получить текст алерта')
	getAlertText (text?: string) {
		return browser.alertText(text);
	}

	/**
	 * Сбросить текущую сессию
	 *
	 * @deprecated
	 * @see reload
	 */
	@deprecated('Use a non-static method')
	@step('Сбросить текущую сессию')
	static reload () {
		browser.reload()
	};

	/** Сбросить текущую сессию */
	@step('Сбросить текущую сессию')
	reload () {
		browser.reload();
	}

	/**
	 * @deprecated
	 * @see disableConfirm
	 */
	@deprecated('Use a non-static method')
	@step('Выключить появление модальных окон')
	static disableConfirm () {
		page.disableConfirm();
	};

	/**
	 * Выключает на текущей странице обработчик onbeforeunload
	 */
	@step('Выключить появление модальных окон')
	disableConfirm () {
		page.disableConfirm();
	}

	/**
	 * Дожидается требуемного адреса
	 *
	 * @param {Function|RegExp|string} value
	 * @param {number} [timeout]
	 * @param {boolean} [revert]
	 */
	@step('Дождаться адреса соответствующего заданному условию "{value}"')
	waitForUrl (
		value: ((url: string) => boolean) | string | RegExp,
		timeout?: number,
		revert?: boolean
	): boolean {
		if (typeof value === 'string') {
			value = URL.format(value);
		}

		try {
			return browser.waitForUrl(value, timeout, revert);
		} catch (error) {
			return false;
		}
	}

	@step('Дождаться появления алерта')
	waitForAlert (timeout?: number, message?: string, reverse: boolean = false) {
		browser.waitForAlert(timeout, message, reverse);
	}

	/**
	 * Дождаться выполнения какого-либо действия
	 * Если событие асинхронное, то колбек должен иметь имя async
	 *
	 * Пример:
	 *
	 * waitUntil(() => {
	 *    // ...
	 * }, 10 * 1000, 'Время на выполнение операции вышло');
	 *
	 * @see browser.waitUntil
	 * @param {Function} callback
	 * @param {number} [timeout]
	 * @param {string} [message]
	 * @returns {*}
	 */
	@step('Дождаться выполнения действия соответвующего заданному условию')
	waitUntil (
		condition: () => boolean | Promise<boolean> | WebdriverIO.Client<WebdriverIO.RawResult<any>> & WebdriverIO.RawResult<any>,
		timeout?: number,
		message?: string,
		interval?: number
	) {
		return browser.waitUntil(condition, timeout, message, interval);
	}

	/**
	 * Дождаться заданных размеров вьюпорта
	 *
	 * @param {Object} expected { width, height }
	 * @returns {boolean}
	 */
	@step('Дождаться заданных размеров вьюпорта: {expected.width}x{expected.height}')
	waitForViewport (expected: WebdriverIO.Size): boolean {
		return this.waitUntil(() => {
			let actual = browser.getViewportSize();

			try {
				return !assert.deepEqual(actual, expected);
			} catch (error) {}
		}, browser.options.waitforTimeout, 'Не удалось дождаться требуемого размера вьюпорта');
	}

	/**
	 * Установить размер вьюпорта
	 *
	 * @deprecated
	 * @see setViewportSize
	 * @param {Object} size
	 * @param {Boolean} [type=true]
	 */
	@deprecated('Use a non-static method')
	@step('Установить размер вьюпорта')
	static setViewportSize (size: WebdriverIO.Size, type: boolean = true) {
		browser.setViewportSize(size, type);
	};

	/**
	 * Установить размер вьюпорта
	 *
	 * @param {Object} size {width, height}
	 * @param {boolean} type:
	 *                      true — изменить размеров вьюпорта
	 *                      false — изменить размер окна
	 */
	@step('Установить размер вьюпорта {size.width}x{size.height}{ type ? " и проверить, совпадает ли реальный размер с требуемым" : "" }')
	setViewportSize (size: WebdriverIO.Size, type: boolean = true): void {
		let { width = 1200, height = 600 } = size;

		browser.setViewportSize({ width, height });

		if (type) {
			this.waitForViewport(size);
		}
	}

	/**
	 * Получить размер вьюпорта
	 *
	 * @returns {Object} {width, height}
	 */
	@step('Получить размер вьюпорта')
	getViewportSize (): WebdriverIO.Size {
		return browser.getViewportSize();
	}

	@step('Переключиться на ближайшую вкладку')
	switchToNextTab () {
		browser.switchToNextTab();
	}

	/**
	 * Перейти по урлу
	 *
	 * @param {string|Query} url — url
	 * @param {Object} [query={}] — параметры запроса
	 * @param {Number} [timeout]
	 */
	@step('Открытие адреса "{url}"')
	url (url: string, query: Query = {}, timeout?: number) {
		this.page.url(url, query, timeout);
	}

	/**
	 * Регрессионное сравнение документа
	 *
	 * @see browser.checkDocument
	 * @see browser.saveDocumentScreenshot
	 * @param {WebdriverIO.VisualRegressionOptions} options
	 *
	 *  Доступные опции:
	 *     options.hide {string[]}              Скрывает заданные элементы
	 *     options.remove {string[]}            Удаляет заданные элементы
	 *     options.widths {number[]}            Задает размер изображениям (desktop)
	 *     options.orientations {number[]}      Устанавливает ориентацию (mobile)
	 *     options.misMatchTolerance {number}   Задает границы поиска несоотвествий (от 0 до 100)
	 *     options.viewportChangePause {number} Устанавливает время ожидания после
	 *                                          изменения раземеров вьюпорта
	 * @param {boolean} [compareOnly=false] - не обрабатывать результаты сравнения, а только вернуть
	 */
	compareDocument (options: WebdriverIO.VisualRegressionOptions, compareOnly: true): WebdriverIO.VisualRegression[];
	compareDocument (options: WebdriverIO.VisualRegressionOptions, compareOnly: false): void;

	@step('Регрессионное сравнение внешнего вида документа { compareOnly ? "без обработки результатов" : "с обработкой результатов" }')
	compareDocument (options: WebdriverIO.VisualRegressionOptions, compareOnly: boolean = false) {
		let images = browser.checkDocument(options),
			actual = images.every(image => image.isExactSameImage);

		if (compareOnly) {
			return images;
		}

		assert(actual, 'Не найдено соответствие документа с ожидаемым изображением');
	}

	/**
	 * Регрессионное сравнение вьюпорта
	 *
	 * @see browser.checkViewport
	 * @see browser.saveViewportScreenshot
	 * @param {WebdriverIO.VisualRegressionOptions} options
	 * @param {boolean} [compareOnly=false] - не обрабатывать результаты сравнения, а только вернуть
	 */
	compareViewport (options: WebdriverIO.VisualRegressionOptions, compareOnly: true): WebdriverIO.VisualRegression[];
	compareViewport (options: WebdriverIO.VisualRegressionOptions, compareOnly: false): void;

	@step('Регрессионное сравнение внешнего вида вьюпорта { compareOnly ? "без обработки результатов" : "с обработкой результатов" }')
	compareViewport (options: WebdriverIO.VisualRegressionOptions, compareOnly: boolean = false) {
		let images = browser.checkViewport(options),
			actual = images.every(image => image.isExactSameImage);

		if (compareOnly) {
			return images;
		}

		assert(actual, 'Не найдено соответствие вьюпорта с ожидаемым изображением');
	}

	/**
	 * Регрессионное сравнение элемента
	 *
	 * @see browser.checkElement
	 * @see browser.saveElementScreenshot
	 * @param {string} locator
	 * @param {WebdriverIO.VisualRegressionOptions} options
	 * @param {boolean} [compareOnly=false] - не обрабатывать результаты сравнения, а только вернуть
	 */
	compareElement (locator: string, options: WebdriverIO.VisualRegressionOptions, compareOnly: true): WebdriverIO.VisualRegression[];
	compareElement (locator: string, options: WebdriverIO.VisualRegressionOptions, compareOnly: false): void;

	@step('Регрессионное сравнение внешнего вида элемента { compareOnly ? "без обработки результатов" : "с обработкой результатов" }')
	compareElement (locator: string, options?: WebdriverIO.VisualRegressionOptions, compareOnly: boolean = false) {
		let images = browser.checkElement(locator, options),
			actual = images.every(image => image.isExactSameImage);

		if (compareOnly) {
			return images;
		}

		assert(actual, 'Не найдено соответствие элемента с ожидаемым изображением');
	}
}

export default Steps;
