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


### Использование

Запустите сервер:

```
npm start
```

Зупустить тесты конкретного набора:

```
grunt test-runner:e.mail.ru --suite=login
```

Зупустить конкретный тест-кейс:

```
grunt test-runner:e.mail.ru --suite=login --grep=TESTMAIL-XXXX
```

*Опция `--grep` принимает название тест-кейса, которое задается в секции `describe`*

Выполнить тесты на заданном адресе:

```
grunt test-runner:e.mail.ru --suite=login --baseUrl=https://e.mail.ru/login
```

Полный список доступных опций test-runner'a смотрите [здесь](https://stash.mail.ru/projects/QA/repos/grunt-test-runner/browse).


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
| **steps** | Шаги                    | store, pages
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

let page = require('../../steps/messages');

describe('TESTMAIL-XXXX', () => {
	it('Проверка перехода на страницу списка писем.', () => {
		page.auth();
		page.open();
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

module.exports = new Login();
```

#### steps

Пример степов:

```js
'use strict';

let assert = require('assert');

let Steps = require('../../steps');
let form = require('../../pages/login/form');
let providers = require('../../store/authorization/providers');

class Form extends Steps {
	constructor () {
		super();
	}

	/**
	 * Проверить домен, который используется по умолчанию
	 *
	 * @param {string} provider
	 */
	checkDefaultDomain (provider) {
		form.getActiveDomain('mail.ru');
	}

	/**
	 * Сверить активный домен
	 *
	 * @param {string} provider
	 */
	getActiveDomain (provider) {
		assert.equal(form.activeDomain, provider,
			`Передан неверный провайдер ${provider}`);
	}

	/**
	 * Получить заголовок формы
	 *
	 * @returns {string}
	 */
	checkTitle () {
		assert.equal(form.title, 'Вход в почту',
			'Не удалось проверить заголовок формы');
	}
}

module.exports = new Form();
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
class Providers extends Store {
	constructor () {
		super();

		/**
		 * Cписок провайдеров
		 *
		 * @property
		 * @returns {Array}
		 */
		this.list = [
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
			},
	}

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

module.exports = Providers;
```

**store/login/providers.js**

```js
'use strict';

let authProviders = require('../../store/authorization/providers');

/** Модуль для работы с данными почтовых провайдеров */
class Providers extends authProviders {
	constructor () {
		super();
	}

	/**
	 * Получить активный список провайдеров (пиктограммы)
	 *
	 * @property
	 * @returns {Array}
	 */
	get active () {
		return this.get([
			'mail.ru',
			'yandex.ru',
			'rambler.ru',
			'gmail.com'
		]);
	}

	/**
	 * Получить список провайдеров (селект)
	 *
	 * @property
	 * @returns {Array}
	 */
	get select () {
		return this.get([
			'mail.ru',
			'yandex.ru',
			'rambler.ru',
			'gmail.com',
			'yahoo.com',
			'hotmail.com',
			'outlook.com'
		]);
	}
}

module.exports = new Providers();
```

### Рекомендации

* Не обращайтесь к объекту `browser` напрямую, только через `this.page` в `pages`
* Все без исключения методы должны иметь аннотацию JSDoc
* Не используйте сокращения вида err, dfd, fn, и пр.
* Для переменной, которая сохраняет состояние используйте название `actual`
* Прижерживайтесь существующей структуры и организации кода проекта
* Для работы с любыми данными используйте всегда хранилище (`store`)
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
