import * as assert from 'assert';
import deprecated from 'deprecated-decorator';
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
	static page: Page
	page: Page;

	/**
	 * Авторизация
	 *
	 * @param {string} [type] — типа авторизации
	 * @param {AccountManager.Credentials} [credentials] — авторизационные данные
	 */
	static auth = Page.auth;

	/**
	 * Получить заголовок страницы
	 */
	title = browser.getTitle;

	/**
	 * Разлогинизация,
	 * если не передать email то берется текущий аккаунт
	 *
	 * @param {string} email
	 * @param {number} timeout
	 */
	logout = account.logout;

	/**
	 * Регистрация пользователя
	 *
	 * @param {string} [type] — тип авторизации
	 * Из-за отсутствия других реализаций пока не используется, но зарезервирован
	 * @param {Object} [options] — авторизационые данные
	 * @returns {AccountManager.Credentials}
	 */
	static register = account.register;

	/**
	 * Открыть страницу
	 *
	 * @param {string|Query} [path]
	 * @param {Object} [query]
	 * @see Page.open
	 */
	static open (path?: string | Query, query?: Query): void {
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

		assert(actual, 'Не удалось авторизоваться');
	}

	/**
	 * Проверяет залогинен ли пользователь
	 *
	 * @deprecated
	 * @see isActiveUser
	 * @param {string} [email]
	 * @param {number} [timeout]
	 */
	@deprecated('Use a non-static method')
	static isActiveUser (email: string, timeout?: number): void {
		let actual = account.isActiveUser(email, timeout);

		assert(actual, `Пользователь "${email}" не авторизован`);
	}

	/**
	 * Проверяет залогинен ли пользователь
	 *
	 * @param {string} [email]
	 */
	isActiveUser = Steps.isActiveUser;

	/**
	 * @deprecated
	 * @see wait
	 */
	@deprecated('Use a non-static method')
	static wait (ms?: number, reverse: boolean = false): void {
		this.page.wait();
	}

	/**
	 * Дождатся загрузки страницы
	 */
	wait (ms?: number, reverse: boolean = false) {
		this.page.wait(reverse, null, ms);
	};

	/**
	 * Локаторы
	 *
	 * @param {string[]} list — список фич, которые требуется включить
	 */
	static features = page.features;

	/**
	 * Скрипты, выполняемые сразу после page.url
	 */
	static inject = page.inject;

	/**
	 * Откладывает выполнение следюущего шага на заданное время
	 *
	 * @deprecated
	 * @param {number} ms
	 * @see pause
	 */
	@deprecated('Use a non-static method')
	static pause (ms: number) {
		browser.pause(ms);
	};

	/**
	 * Откладывает выполнение следюущего шага на заданное время
	 *
	 * @param {number} ms
	 */
	pause = browser.pause;

	/**
	 * @deprecated
	 * @see refresh
	 * @param {Object} query
	 */
	@deprecated('Use a non-static method')
	static refresh (query: Query = {}) {
		page.refresh(query);
	};

	/**
	 * Перезагружает текущую страницу
	 *
	 * @param {Object} [query] — параметры запроса
	 */
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
	static alertAccept () {
		browser.alertAccept();
	};

	/** Подтвердить алерт */
	alertAccept = browser.alertAccept;

	/**
	 * Получить текст alert'a
	 *
	 * @deprecated
	 * @see getAlertText
	 * @returns {string}
	 */
	@deprecated('Use a non-static method')
	static getAlertText (text?: string) {
		browser.alertText(text);
	};

	/**
	 * Получить текст алерта
	 *
	 * @returns {string}
	 */
	getAlertText = browser.alertText;

	/**
	 * Сбросить текущую сессию
	 *
	 * @deprecated
	 * @see reload
	 */
	@deprecated('Use a non-static method')
	static reload () {
		browser.reload()
	};

	/** Сбросить текущую сессию */
	reload = browser.reload;

	/**
	 * @deprecated
	 * @see disableConfirm
	 */
	@deprecated('Use a non-static method')
	static disableConfirm () {
		page.disableConfirm();
	};

	/**
	 * Выключает на текущей странице обработчик onbeforeunload
	 */
	disableConfirm = page.disableConfirm;

	/**
	 * Установить размер вьюпорта
	 *
	 * @deprecated
	 * @see setViewportSize
	 * @param {Object} size
	 */
	@deprecated('Use a non-static method')
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
	setViewportSize (size: WebdriverIO.Size, type: boolean = true): void {
		let { width = 1200, height = 600 } = size;

		browser.setViewportSize({ width, height });

		if (type) {
			this.waitForViewport(size);
		}
	}

	/**
	 * Дожидается требуемного адреса
	 *
	 * @param {Function|RegExp|string} value
	 * @param {number} [timeout]
	 * @param {boolean} [revert]
	 */
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

	/**
	 * Получить размер вьюпорта
	 *
	 * @returns {Object} {width, height}
	 */
	getViewportSize = browser.getViewportSize

	/**
	 * Переключиться на ближайшую вкладку
	 */
	switchToNextTab = browser.switchToNextTab;

	/**
	 * Ожидаем алерт
	 */
	waitForAlert = browser.waitForAlert;

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
	waitUntil = browser.waitUntil;

	/**
	 * Перейти по урлу
	 *
	 * @param {string|Query} url — url
	 * @param {Object} [query] — параметры запроса
	 */
	url (url: string, query: Query = {}, timeout?: number) {
		this.page.url(url, query, timeout);
	}

	/**
	 * Дожидается заданных размеров вьюпорта
	 *
	 * @param {Object} expected { width, height }
	 * @returns {boolean}
	 */
	waitForViewport (expected: WebdriverIO.Size): boolean {
		return this.waitUntil(() => {
			let actual = browser.getViewportSize();

			try {
				return !assert.deepEqual(actual, expected);
			} catch (error) {}
		}, browser.options.waitforTimeout, 'Не удалось дождаться требуемого размера вьюпорта');
	}

	/**
	 * Регрессионное сравнение документа
	 *
	 * @see browser.checkDocument
	 * @see browser.saveDocumentScreenshot
	 * @param {WebdriverIO.ScreenshotOptions} options
	 *
	 *  Доступные опции:
	 *     options.hide {string[]}              Скрывает заданные элементы
	 *     options.remove {string[]}            Удаляет заданные элементы
	 *     options.widths {number[]}            Задает размер изображениям (desktop)
	 *     options.orientations {number[]}      Устанавливает ориентацию (mobile)
	 *     options.misMatchTolerance {number}   Задает границы поиска несоотвествий (от 0 до 100)
	 *     options.viewportChangePause {number} Устанавливает время ожидания после
	 *                                          изменения раземеров вьюпорта
	 */
	compareDocument (options: WebdriverIO.ScreenshotOptions): void {
		let images = browser.checkDocument(options),
			actual = images.every(image => image.isExactSameImage);

		assert(actual, 'Не найдено соответствие документа с ожидаемым изображением');
	}

	/**
	 * Регрессионное сравнение вьюпорта
	 *
	 * @see browser.checkViewport
	 * @see browser.saveViewportScreenshot
	 * @param {WebdriverIO.ScreenshotOptions} options
	 */
	compareViewport (options: WebdriverIO.ScreenshotOptions): void {
		let images = browser.checkViewport(options),
			actual = images.every(image => image.isExactSameImage);

		assert(actual, 'Не найдено соответствие вьюпорта с ожидаемым изображением');
	}

	/**
	 * Регрессионное сравнение элемента
	 *
	 * @see browser.checkElement
	 * @see browser.saveElementScreenshot
	 * @param {string} locator
	 * @param {WebdriverIO.ScreenshotOptions} options
	 */
	compareElement (locator: string, options?: WebdriverIO.ScreenshotOptions): void {
		let images = browser.checkElement(locator, options),
			actual = images.every(image => image.isExactSameImage);

		assert(actual, 'Не найдено соответствие элемента с ожидаемым изображением');
	}
}

export default Steps;
