# Yoda

### Платформа для написания интеграционных тестов

![Yoda](files/logo.jpg)

Меленький `Yoda` призван помочь большой `Fete`

<br />
**ВНИМАНИЕ**: перед тем как вы начнете использовать данный пакет внимательно ознакомьтесь с [документацией](https://confluence.mail.ru/pages/viewpage.action?pageId=95546244)!
<br />
<br />

### Установка

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
nvm install 6.2
nvm use 6.2
nvm alias default 6.2
```

**java**

Для запуска сервера потребуется [установить](http://www.oracle.com/technetwork/java/javase/downloads/index.html) Java

**jdk**

В случае возникновения следующей ошибки:

```
Exception in thread "main" java.lang.UnsupportedClassVersionError: org/openqa/grid/selenium/GridLauncher : Unsupported major.minor version 51.0
```

Обновите [JDK](http://www.oracle.com/technetwork/java/javase/downloads/index.html)


### Конфигурирование

Основной файл, который отвечает за конфигурирование сервера и запуск тестов распологается в директории:

```
tests/<ваш_проект>/config.js
```

Однако править этот файл не рекомендуется. Вместо этого используйте локальный конфиг:

```
tests/<ваш_проект>/config.local.js
```

Дополнительную информацию о формате конфига и его опциях смотрите [здесь](http://webdriver.io/guide/getstarted/configuration.html).


### Использование

Запуск сервера (запускается автоматически, скорее всего вам это не понадобится):

```
npm start
```

Зупустить тесты конкретного тестового набора:

```
npm test -- e.mail.ru --suite=login
```

`--suite` может принимать множество значений:

```
npm test -- e.mail.ru --suite='login,compose'
```

Зупустить конкретный тест-кейс:

```
npm test -- e.mail.ru --suite=login --grep=TESTMAIL-8674
```

*Опция `--grep` принимает часть имени файла*

Выполнить тесты на заданном адресе:

```
npm test -- e.mail.ru --suite=login --grep=TESTMAIL-8674 --baseUrl=https://e.mail.ru/login
```

Полный список доступных опций test-runner'a смотрите [здесь](https://stash.mail.ru/projects/QA/repos/grunt-test-runner/browse).


### Логи и отчеты

**cache/tests/<project>/logs** — логи сервера
**cache/tests/<project>/shots** — скриншоты с упавшими тестами
**cache/tests/<project>/reports** — отчеты о прогоне


### API

Во всех тестах через степы доступны следующие методы:


#### Page#open({...})

Открытие требуемого представления

```js
let Messages = require('../../steps/messages');

describe('TESTMAIL-31873', () => {
	Messages.open();
});
```

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

describe('TESTMAIL-31873', () => {
	beforeEach(() => {
		Messages.features([
			'check-missing-attach',
			'disable-ballons',
			'no-collectors-in-compose'
		]);

		Messages.open();
	});
});
```

Используейте символ `:` если фиче требуется передать какое-то значение:

```js
Messages.features([
	'check-missing-attach:1'
])
```

#### Page#auth(type=basic, { username, password })

Авторизация

```js
let Messages = require('../../steps/messages');

describe('TESTMAIL-31873', () => {
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
let authorization = require('../../store/authorization');

authorization.account;
```

Метод .credentials примает те же типы, что Page\#auth


#### store/authorization.credentials(type=basic, { id, login, domain, type }, timeout)

Получение авторизационных данные указанного типа

```js
let authorization = require('../../store/authorization');

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
let accounts = require('../../store/authorization/accounts');

accounts.get('gmail.com', ['pdd']);
```

Второй параметр опциональный и, как правило, имеет смысл только с некоторыми значениями, например `pdd`.


#### store/authorization/providers

Здесь содержится набор методов для получения списка провайдеров с учетом различных фильтров, в т.ч. и топа.


### Структура проекта

Ниже будет рассмотрена структура проекта на примере e.mail.ru:

```
➜ tests
	➜ e.mail.ru
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
```

| Сущность  | Назначение              | Взаимодействие |
|-----------|-------------------------|----------------|
| **cases** | Тест-кейсы              | store, steps
| **pages** | Элементы предстравления | store, browser
| **steps** | Шаги                    | store, pages, steps
| **store** | Хранилище               | store
| **utils** | Утилиты                 | store

Обратие внимание, что взаимодействие между сущностями строго регламентировано. Например, это значит, что вы не можете внутри какого-либо тест-кейса обращься к элементам представления (все объекты представления включая `browser` можно вызывать только в директории `pages` и нигде больше).


#### cases

Пример тест-кейса:

```js
'use strict';

let assert = require('assert');

let login = require('../../steps/login');
let form = require('../../steps/login/form');

describe('TESTMAIL-24935', () => {
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

describe('TESTMAIL-XXXX', () => {
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

let Steps = require('../../steps');
let LoginForm = require('../../pages/login/form');
let providers = require('../../store/authorization/providers');

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

let authProviders = require('../../store/authorization/providers');

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
* Все без исключения методы должны иметь аннотацию JSDoc.
* Все файлы в папке page должны возвращать ссылку на класс.
* Все индесные файлы в папке steps должны возвращать ссылку на класс.
* Всегда определяйте `location` и `locators.container` в индексоном файле вашего предствления (page).
* Не используйте сокращения вида err, dfd, fn, и пр.
* Для переменной, которая сохраняет состояние используйте название `actual`.
* Прижерживайтесь существующей структуры и организации кода проекта.
* Для работы с любыми данными используйте всегда хранилище (`store`).
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
	 * @returns {Promise}
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
/**
 * Получить значение поля по имени
 *
 * @see form.getField
 * @param {string} name — имя поля
 */
getFieldValue (name) {
	form.getFieldValue(name);
}
```
