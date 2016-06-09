# e.mail.ru-tests

> Набор интеграционных тестов для проекта e.mail.ru


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


### Использование


Запустите сервер: 

```
npm run server
```

Запустите тесты: 

```
grunt test
```

Зупустить тесты конкретного набора:

```
grunt test --suite=login
```

Зупустить на заданном адресе:

```
grunt test --baseUrl=https://e.mail.ru/login
```
