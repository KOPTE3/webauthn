# Yoda

### Платформа для написания интеграционных тестов

![Yoda](files/logo.jpg)
> Небольшая платформа, которая призвана решать серьезные задачи.

<br />

**ВНИМАНИЕ**: Знакомьтесь с основными [изменениями](./CHANGELOG.md)!<br />
**ВНИМАНИЕ**: Помимо [стандартных](http://webdriver.io/api.html) команд имеются [кастомные](https://stash.mail.ru/projects/QA/repos/wdio-api/browse)

<br />
<br />

### Установка

Для работы с этим пакетом используйте [grunt-init-yoda](https://stash.mail.ru/projects/QA/repos/grunt-init-yoda/browse).

Разработчикам:

**git**

```
git clone ssh://git@stash.mail.ru:2222/qa/yoda.git
```

**npm**

```
npm install @qa/yoda
```

**nvm**

Для работы с этим пакетом требуется node версии не ниже 6.2.0! <br />
Поскольку обновить node и npm на всех машинах до требуемой версии весьма проблематично — используйте [nvm](https://github.com/creationix/nvm):

```
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.31.1/install.sh | bash
source ~/.bash{rc,_profile}
nvm install 6
nvm use 6
nvm alias default 6
```

**java**

Для запуска сервера потребуется [установить](http://www.oracle.com/technetwork/java/javase/downloads/index.html) Java

**jdk**

В случае возникновения следующей ошибки:

```
Exception in thread "main" java.lang.UnsupportedClassVersionError: org/openqa/grid/selenium/GridLauncher : Unsupported major.minor version 51.0
```

Обновите [JDK](http://www.oracle.com/technetwork/java/javase/downloads/index.html)


### Совместимость

Пакет совместим о всеми известными окружениями, однако работа с npm-хуками в Сygwin имеет некоторые ограничения на запуск файлов с правами на исполнение. Также в нем отсутствует команда source. Поэтому будьте бдительны :)


### Документация

Основная [документация](https://confluence.mail.ru/pages/viewpage.action?pageId=97748321) по этому проекту находится здесь. Однако для получение актуальной информации о всех изменения следите за файлом [CHANGELOG.md](./CHANGELOG.md).


### Конфигурирование

Основной файл, который отвечает за конфигурирование сервера и запуск тестов распологается в директории:

```
tests/config.js
```

Однако править этот файл не рекомендуется. Вместо этого используйте локальный конфиг:

```
tests/config.local.js
```

Дополнительную информацию о формате конфига и его опциях смотрите [здесь](http://webdriver.io/guide/getstarted/configuration.html).


### CI

Пример запуска тестов в среде непрерывной интеграции смотрите [здесь](http://win110.dev.mail.ru:8080/view/Yoda/job/yoda.suites). 


### Использование

Запуск сервера:

```
npm start
```

По умолчанию сервер запускается автоматически, но если вы все-таки хотите использовать ручной запуск, то для этого потребуется закомментировать поле `services: ['selenium-standalone'],` в вашем локальном конфиге (`config.local.js`).


#### Зупустить тесты конкретного тестового набора:

```
npm test -- --suite=login
```

`--suite` может принимать множество значений:

```
npm test -- --suite='login,compose'
```

#### Запуск тестов по фильтру:

```
npm test -- --suite=login --grep=TESTMAIL-8674
```

*Опция `--grep` принимает регулярное выражение*

```
npm test -- --suite=login --grep=TESTMAIL-867[45]
```

В этом случае, будут запущены два теста TESTMAIL-8674 и TESTMAIL-8675


#### Выполнить тесты на заданном адресе:

```
npm test -- --suite=login --grep=TESTMAIL-8674 --url=https://e.mail.ru/login
```

Для запуска тестов локально вы можете использовать grunt напрямую:

```
grunt yoda --suite=compose
```

Но такой способ запуска не следует использовать в CI (лучше вообще не использовать), поскольку так будет использоваться глобальная grunt'а.

Полный список доступных опций test-runner'a смотрите [здесь](https://stash.mail.ru/projects/QA/repos/grunt-yoda/browse).


### Логи и отчеты

**cache/tests/logs** — логи сервера
**cache/tests/shots** — скриншоты с упавшими тестами
**cache/tests/reports** — отчеты о прогоне


### API

Во всех тестах через степы доступны следующие методы:


#### Page#open({...})

Открытие требуемого представления

```js
let Messages = require('../../steps/messages');

describe(() => {
	it ('Открытие страницы списка писем', => {
		Messages.open();
	});
});
```

Если блок `describe` анонимный, то в качестве описания будет использоваться только название файла (которое соответствует номеру таска в JIRA). 

ЗАПОМНИТЕ: писать номер таска в описании не нужно, он подставляется автоматически. 

Метод auth дополнительно принимает параметры запроса:

```js
Messages.open({
	foo: 1
});
```

#### Page#features([...])

Включение фич:

```js
let Messages = require('../../steps/messages');

describe(() => {
	beforeEach(() => {
		Messages.features([
			'check-missing-attach',
			'disable-ballons',
			'no-collectors-in-compose'
		]);

		Messages.open();
	});

	it ('Открытие страницы списка писем', => {
		// ...
	});
});
```

Используейте символ `:` если фиче требуется передать какое-то значение:

```js
Messages.features([
	'check-missing-attach:1'
])
```

#### Page#register(type=basic, { username, password, ... })

Регистрация нового пользователя

```js
let Messages = require('../../steps/messages');

describe(() => {
	let { username, password } = Messages.register('basic');

	Messages.auth('basic', { username, password });
	Messages.open();
});
```

#### Page#auth(type=basic, { username, password, ... })

Авторизация

```js
let Messages = require('../../steps/messages');

describe(() => {
	Messages.auth();
	Messages.open();
});
```

Метод auth дополнительно принимает тип авторизации:

```js
Messages.auth('external');
```

Список доступных типов: pdd, external, basic (используется по умолчанию)

Также есть возможность авторизоваться конкретным пользователем:

```js
Messages.auth('basic', {
	username: 'aziza.voronova.52@list.ru',
	password: 'dknMuWpuzvG9'
});
```

#### store/authorization.account

Получение авторизационных сведений текущего аккаунтпа

```js
let authorization = require('@qa/yoda/store/authorization');

authorization.account;
```

Метод .credentials примает те же типы, что Page\#auth


#### store/authorization.credentials(type=basic, { id, login, domain, type }, timeout)

Получение авторизационных данные указанного типа

```js
let authorization = require('@qa/yoda/store/authorization');

authorization.credentials('external');

authorization.credentials('external', {
	domain: 'gmail.com'
});
```

Метод .credentials принимает те же типы, что Page\#auth

ВНИМАНИЕ: обязательно вызываейте этот метод `discard` для осовобождения занимаемого аккаунта!

#### store/authorization/accounts.get

Возвращает учетную запись из локального хранилища

ВНИМАНИЕ: Данные учетные записи разрешается использтвать только в тестах, которые не изменяют состояние аккаунта (например, авторизация). Во всех остальных случаях — используейте store/authorization.credentials

```js
let accounts = require('@qa/yoda/store/authorization/accounts');

accounts.get('gmail.com', ['pdd']);
```

Второй параметр опциональный и, как правило, имеет смысл только с некоторыми значениями, например `pdd`.


#### store/authorization/providers

Здесь содержится набор методов для получения списка провайдеров с учетом различных фильтров, в т.ч. и топа.


#### store/authorization/passwords

Позволяет получить предопределенный пароль заданой сложности


#### utils/account.passwordStrength

Позволяет определить сложность пароля


### Методы регрессионого тестирования средставами визуального сравнения

Убедитесь, что в вашем package.json-файле имеются следующие зависимости:

```json
{
	"dependencies": {
		"wdio-screenshot": "^0.2.3",
		"wdio-visual-regression-service": "^0.4.0"
	}
}
```

#### API

```
 .compareDocument([options])
 .compareViewport([options])
 .compareElement(locator, [options])
```

Доступные опции:

```
options.hide {string[]}              Скрывает заданные элементы
options.remove {string[]}            Удаляет заданные элементы
options.widths {number[]}            Задает размер изображениям (desktop)
options.orientations {number[]}      Устанавливает ориентацию (mobile)
options.misMatchTolerance {number}   Задает границы поиска несоотвествий (от 0 до 100)
options.viewportChangePause {number} Устанавливает время ожидания после
                                     изменения раземеров вьюпорта
```

Пример использования в проекте themes.mail.ru:

**config.js**

```js
let VisualRegressionCompare = require('wdio-visual-regression-service/compare');

{
	/** Конфигурация для сервиса visual-regression */
	visualRegression: {
		compare: new VisualRegressionCompare.LocalCompare({
			referenceName : support.screenshot('./store/shots/expected'),
			screenshotName: support.screenshot('./store/shots/actual'),
			diffName      : support.screenshot('./store/shots/diff')
		})
	},

	/**
	 * Список сервисов, которые будет использоваться для запуска тестов
	 *
	 * selenium-standalone — позволяет автоматически запускать и останавливать
	 * работу selenium-сервера
	 */
	services: [
		/**
		 * Сервис для регрессионого тестирования через сравнение скриншотов
		 */
		'visual-regression'
	]
}
```

**cases/messages/TESTMAIL-34047.js**

```js
'use strict';

let Messages = require('../../steps/messages');
let { dimensions, config } = require('../../store');

let TIMEOUT = 30 * (60 * 1000);
let messages = new Messages();

describe('Темы. Общее соответствие оформления на списке писем', function () {
	this.timeout(TIMEOUT);

	before(() => {
		Messages.auth();
		Messages.open();
	});

	for (let theme in config) {
		for (let dimension of dimensions) {
			let { width, height } = dimension;

			it(`${theme}-${width}x${height}`, () => {
				messages.setTheme(theme);
				messages.setViewportSize(dimension);
				messages.compareDocument();
			});
		}
	}
});
```

**cases/messages/index.js**

```js
'use strict';

let assert = require('assert');

let MailMessagesSteps = require('@qa/yoda-e.mail.ru/steps/messages');
let MessagesPage = require('../../pages/messages');

let page = new MessagesPage();

/** Модуль для работы с шагами представления */
class MessagesSteps extends MailMessagesSteps {
	constructor () {
		super();
	}

	/**
	 * Возвращает ссылку на инстанс страницы
	 *
	 * @type {Object}
	 */
	static get page () {
		return page;
	}

	compareDocument () {
		let { hide } = page.locators;

		super.compareDocument({ hide });
	}
}

module.exports = MessagesSteps;
```

**pages/messages/index.js**

```js
'use strict';

let MailMessagesPages = require('@qa/yoda-e.mail.ru/pages/messages');

/** Модуль для работы с представлением */
class MessagesPage extends MailMessagesPages {
	/**
	 * Локаторы
	 *
	 * @type {Object}
	 */
	get locators () {
		return this.extend(super.locators, {
			/** Список интерактивных элементов, которые требуется исключить */
			hide: [
				'#leftcol-banners',
				'.b-datalist__head',
				'.pm-menu__center__inner',
				'#portal-headline',
				'#SeptimaFeedback',
				'.footer__theme-widget',
				'#footer__portal'
			]
		});
	}
}

module.exports = MessagesPage;
```

### Асинхронные тесты

Пример асинхронного теста:

```js
browser.timeouts('script', TIMEOUT);

let { value } = browser.executeAsync(function (name, value, resolve) {
	require(['features'], function (features) {
		var actual = features.use(name, value);

		resolve(actual);
	});
}, name, value);
```

А что если нужно вернуть результат объекта Promise?

```js
let { value } = browser.waitForPromise(() => {
	return new Promise((resolve, reject) => {
		resolve(true);
	});
}, TIMEOUT, 'Error');
```

Обратите внимание, что мы использовали кастомную команду `browser.waitForPromise`, которая на вход получает колбек возвращающий промис, либо сам промис.


Этот же пример можно переписать следующим образом:

```js
let { value } = browser.call(() => {
	return browser.executeAsync(function (name, value, resolve) {
		require(['features'], function (features) {
			var actual = features.use(name, value);

			resolve(actual);
		});
	}, name, value);
});
```

Однако в этом случае, мы не сможем задать сообщение об ошибке и таймаут! 
`browser.timeouts` и `browser.timeoutsAsyncScript` также не помогут в этом вопросе.

Есть также распространенная практика использовать асинхронный `waitUntil`: 

```js
browser.waitUntil(function async () {
	return Promise.resolve(true);
});
```

Проблемы такого способа:

* `waitUntil` не вернет результат, поспольку всегда ожидает получить `true`
* Если забыть указать название функции `async`, то метод будет работать синхронно
* Опция timeout будет проигнорирована до тех пока не будет вызван хотя бы один раз `reject`!
* Без [фиктивного](https://github.com/webdriverio/webdriverio/issues/1407) `reject`'a тест зависнет навечно.

Однако, если вам нужно дождаться какого-то состояния интерфейса, то waitUntil отличный помощник:
 
```js
browser.waitUntil(function async () {
	return browse.isVisible('body');
});
```

### Файловая система

Для работы с файлами, которые хранятся на диске используйте системное хранилище:

```js
let system = require('@qa/yoda/store/system');

system.file('имя_файла');
```

### Структура проекта

Ниже будет рассмотрена структура проекта на примере e.mail.ru:

```
➜ tests
	➜ cases
		➜ <название_раздела>
			<название_кейса>.js
	➜ pages
		➜ <название_раздела>
			<название_предствавления>.js
	➜ steps
		➜ <название_раздела>
			<шаги_раздела>.js
	➜ store
		➜ <название_раздела>
			<хранилище_раздела>.js
	➜ utils
		➜ <название_раздела>
			<утилиты_раздела>.js
	config.js
	config.local.js
```


Пример:

```
cases
	compose
		MAIL-15143
			TESTMAIL-18932.js

pages
	compose
		attaches.js

steps
	compose
		attaches.js

store
	compose
		attaches.js

tasks
	yoda.js

utils
	attaches
		add.js
```

| Сущность  | Назначение              | Взаимодействие |
|-----------|-------------------------|----------------|
| **cases** | Тест-кейсы              | store, steps
| **pages** | Элементы предстравления | store, browser
| **steps** | Шаги                    | store, pages, steps
| **store** | Хранилище               | store
| **tasks** | Задания                 | tasks
| **utils** | Утилиты                 | store

Обратие внимание, что взаимодействие между сущностями строго регламентировано. Например, это значит, что вы не можете внутри какого-либо тест-кейса обращься к элементам представления (все объекты представления включая `browser` можно вызывать только в директории `pages` и нигде больше).


#### cases

Пример тест-кейса:

```js
'use strict';

let assert = require('assert');

let login = require('../../steps/login');
let form = require('../../steps/login/form');

describe(() => {
	it('Проверка отображения элементов на форме авторизации', () => {
		login.open();

		form.checkDefaultDomain();
		form.checkTitle();
	});
});
```

Пример теста с авторизацией:

```js
'use strict';

let Messages = require('../../steps/messages');

describe(() => {
	it('Проверка перехода на страницу списка писем.', () => {
		Messages.auth();
		Messages.open();
	});
});
```

В тест-кейсе вызываются **только** шаги!


#### pages

Пример представления:

```js
'use strict';

let assert = require('assert');
let PageObject = require('../../pages');

class Login extends PageObject {
	constructor () {
		super();
	}

	get location () {
		return '/login'
	}

	get locators () {
		return {
			container: '.login-page__external'
		}
	}

	open () {
		browser.url('/login');

		return browser.waitForExist(this.locators.container);
	}
}

module.exports = Login;
```

#### steps

Пример степов:

```js
'use strict';

let assert = require('assert');
let providers = require('@qa/yoda/store/authorization/providers');

let Steps = require('../../steps');
let LoginForm = require('../../pages/login/form');

class LoginFormSteps extends Steps {
	constructor () {
		super();

		this.loginForm = new LoginForm();
	}

	/**
	 * Проверить домен, который используется по умолчанию
	 *
	 * @param {string} provider
	 */
	checkDefaultDomain (provider) {
		this.loginForm.getActiveDomain('mail.ru');
	}

	/**
	 * Сверить активный домен
	 *
	 * @param {string} provider
	 */
	getActiveDomain (provider) {
		assert.equal(this.loginForm.activeDomain, provider,
			`Передан неверный провайдер ${provider}`);
	}

	/**
	 * Получить заголовок формы
	 *
	 * @returns {string}
	 */
	checkTitle () {
		assert.equal(this.loginForm.title, 'Вход в почту',
			'Не удалось проверить заголовок формы');
	}
}

module.exports = LoginFormSteps;
```

#### store

Пример хранилища данных:

```
➜ store
	➜ authorization
		index.js
		providers.js

	➜ login
		providers.js
```

**store/authorization/providers.js**

```js
'use strict';

let Store = require('../../store');

/** Модуль для работы с данными почтовых провайдеров */
module.exports = {
	/**
	 * Cписок провайдеров
	 *
	 * @returns {Array}
	 */
	list: [
		{
			name: 'mail.ru',
			type: 'internal',
			data: [
				'mail.ru',
				'mail.ua',
				'inbox.ru',
				'list.ru',
				'bk.ru'
			]
		}
	],

	/**
	 * Добаавляет список провайдеров
	 *
	 * @param {...Array} providers — список провайдеров
	 */
	set (...providers) {
		this.list.push(...providers)
	}

	/**
	 * Возвращает список провайдеров
	 *
	 * @param {Array|null} providers — заданный список провайдеров
	 * @returns {Array}
	 */
	get (providers) {
		if (providers) {
			return this.list.filter(provider => {
				if (providers.includes(provider.name)) {
					return provider;
				}
			});
		}

		return this.list;
	}
}
```

**store/login/providers.js**

```js
'use strict';

let authProviders = require('@qa/yoda/store/authorization/providers');

/** Модуль для работы с данными почтовых провайдеров на странице логина */
module.exports = {
	/**
	 * Получить активный список провайдеров (пиктограммы)
	 *
	 * @type {Array}
	 */
	get active () {
		return authProviders.get([
			'mail.ru',
			'yandex.ru',
			'rambler.ru',
			'gmail.com'
		]);
	},

	/**
	 * Получить список провайдеров (селект)
	 *
	 * @type {Array}
	 */
	get select () {
		return authProviders.get([
			'mail.ru',
			'yandex.ru',
			'rambler.ru',
			'gmail.com',
			'yahoo.com',
			'hotmail.com',
			'outlook.com'
		]);
	}
};
```

### Требования

* Не обращайтесь в pages к объекту browser напрямую. Вместо этого используйте ссылку `this.page`.
* Устаревшие тесты, которые подлежат удалению зафиксируйте статусом Archive в JIRA.
* Писать номер таска в блоке `describe` не нужно, он подставляется автоматически.
* Универсальные команды добавляйте в проект [@qa/wdio-api](ssh://git@stash.mail.ru:2222/qa/wdio-api.git)
* Используйте JSDoc аннотацию для документирования функций, которые принимают параметры и возвращают значения.
* Все файлы, в которых определены классы должны возвращать ссылки, а не инстанс.
* Всегда определяйте `location` и `locators.container` в индексном файле вашего предствления (page).
* Всегда определяйте `page` в индексном файле степов.
* Не используйте сокращения вида err, dfd, fn, и пр.
* Для переменной, которая сохраняет состояние используйте название `actual`.
* Прижерживайтесь существующей структуры и организации кода проекта.
* Для работы с любыми данными используйте хранилища (`store`).
* Если вы работаете с полями формы, то у вас должны быть определены как минимум следующие типы методов:


| Метод  | Назначение                                | Определение    |
|---------------------|------------------------------|----------------|
| **getField**        | Получить значение элемента   | pages
| **getFieldValue**   | Получить значение элемента   | pages
| **setFieldValue**   | Установить значение элемента | pages, steps
| **clearFieldValue** | Очистить значение элемента   | pages, steps


Необязательные методы:

| Метод              | Назначение                   | Определение    |
|--------------------|------------------------------|----------------|
| **showField**      | Показать элемент             | pages, steps
| **hideField**      | Скрыть элемент               | pages, steps
| **isVisibleField** | Проверить видимость элемента | pages, steps
| **clickField**     | Сделать клик в поле          | pages, steps
| **tabField**       | Перейти в поле по табу       | pages, steps


Эти методы должны примать имена полей и значения:

**<page>**

```js
{
	/**
	 * Получить элемент поля по имени
	 *
	 * @param {string} name — имя поля.
	 * Доступные значения (from, to, cc, bcc, subject, priority, receipt, remind)
	 *
	 * @returns {WebDriver}
	 */
	getField (name) {
		return this.page.element(this.locators.fields[name]);
	}
}
```

```js
{
	/**
	 * Получить значение поля по имени
	 *
	 * @see getField
	 * @param {string} name — имя поля
	 * @returns {string}
	 */
	getFieldValue (name, value) {
		return this.getField(name).getValue();
	}
}
```

**<step>**

```js
{
	/**
	 * Получить значение поля по имени
	 *
	 * @see form.getField
	 * @param {string} name — имя поля
	 */
	getFieldValue (name) {
		form.getFieldValue(name);
	}
}
```

**Универсальные локаторы**

Да, локаторы можно сделать универсальными:

```js
{
	get locators () {
		let container = 'body';

		return {
			button: new Proxy({}, {
				get (target, name) {
					return `${container} .b-btn-social__social__link_${name}`;
				}
			})
		}
	}
}
```

Далее к такому локатору можно обращаться так:

```
this.locators.button.vk
```

Так вы получите такой локатор: 

```
body .b-btn-social__social__link_vk
```
