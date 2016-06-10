'use strict';

let phantom = require('phantomjs-prebuilt'),
    api = require('@qa/wdio-custom-api');

/** @namespace browser */
exports.config = {
    /*
     * Настройки, с которыми запущен Selenium-сервер
    */
    host: 'localhost',
    port: 4444,
    path: '/wd/hub',

    /* Базовый адрес тестирования */
    baseUrl: 'https://e.mail.ru',

    /* Доступные значения: silent, verbose, command, data, result, error */
    logLevel: 'silent',

    /*
     * Опция позволяет отладчику остановить выполнение тестов
     * в месте вызова инструкции debugger.
     * Для использования этой опции требуется наличие пакета node-inspector
    */
    debug: false,

    /* Количество инстансов параллельного запуска тестов */
    // maxInstances: 1,

    /* Доступные значения: cucumber, mocha, jasmine */
    framework: 'mocha',

    mochaOpts: {
        ui: 'bdd'
    },

    /* Для реппортера Allure требуется наличие установленного плагина в CI */
    reporters: ['dot', 'junit'],

    reporterOptions: {
        outputDir: './cache/tests/reports'
    },

    /* Директория, куда будут складываться скриншоты */
    // screenshotPath: './cache/tests/shots',

    /* Директория, куда будут складываться логи */
    logfile: './cache/tests/logs',

    /*
     * Список файлов с тестами.
     * Порядок файлов сохраняется, дубликаты исключаются
    */

    specs: [
        './tests/**/*index.js'
    ],

    suites: {
        login: [
            './tests/login/index.js'
        ],

        passrestore: [
            './tests/passrestore/index.js'
        ]
    },

    /*
     * Обратие внимание на то, что браузеры запускаются параллельно
     * Конфигуратор https://wiki.saucelabs.com/display/DOCS/Platform+Configurator
     *
     * Внутри каждой группы доступны поля specs и exclude
     *
     * Опция pageLoadStrategy позволяет начать выполнение тестов сразу
     * после построения DOM-дерева (document.readyState == 'interactive')
     * В Selenium до версии 2.46 использовалось именование pageLoadingStrategy
     *
     * Если требуется установить какой-то кастомный браузер
     * (например, для тестирования игрового центра), то нужно указать путь:
     *
     * chromeOptions: {
     *     binary: 'Electron.app/Contents/MacOS/Electron'
     * }
     *
     * Список стандартных опций WebDriver
     * https://github.com/SeleniumHQ/selenium/wiki/DesiredCapabilities
    */
    capabilities: [
        {
            browserName: 'phantomjs',

            // http://phantomjs.org/api/command-line.html
            'phantomjs.binary.path': phantom.path,

            'phantomjs.cli.args': [
                // '--debug=yes',
                '--ignore-ssl-errors=yes'
            ]
        }
    ],

    before (capabilities, specs) {
        api(browser);
    }
};
