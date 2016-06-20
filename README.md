# e.mail.ru-tests

> Набор интеграционных тестов для проекта e.mail.ru


ВНИМАНИЕ: перед тем как вы начнете использовать данный пакет внимательно ознакомьтесь с [документацией](confluence.mail.ru/pages/viewpage.action?pageId=95546244)!


### Установка

**npm**

```
npm install @mail/e.mail.ru-tests
```

**nvm**

Для работы с этим пакетом требуется node версии не ниже 6.2.0! <br />
Поскольку обновить node и npm на всех машинах до требуемой версии весьма проблематично — используйте [nvm](https://github.com/creationix/nvm):

```
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.31.1/install.sh | bash
source ~/.bash{rc,_profile}
nvm install 6.2
nvm use 6.2
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

Запустите тесты:

```
grunt test
```

Зупустить тесты конкретного набора (ваш случай):

```
grunt test-runner:omega --suite=login
```

Зупустить тесты конкретного файла:

```
grunt test-runner:omega --suite=login --grep=TESTMAIL-8674
```

Зупустить на заданном адресе:

```
grunt test-runner:omega --baseUrl=https://e.mail.ru/login
```

Пример теста с авторизацией:

```js
'use strict';

let assert = require('assert');
let page = require('../object');

describe('TESTMAIL-8674', () => {
	it('Авторизация.', () => {
		page.auth();
		page.open('/messages/inbox');

		assert.equal(browser.getUrl(), 'https://e.mail.ru/messages/inbox');
	});
});
```
