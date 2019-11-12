const presets = [
    [
    "@babel/env",
    {
        targets: { // версии браузеров которые нужно поддерживать
            edge: ">= 15",
            firefox: "<= 70",
            chrome: "<= 78",
            safari: "<= 13",
            chromeAndroid: "<= 76"
        },
            useBuiltIns: "usage", // эта настройка babel-polyfill, если стоит значение usage, то будут подставлятся полифилы для версий браузеров которые указали выше.
            corejs: "3.1.4", // явно проставить версию corejs
             "targets": { // указать цели, для полифилов
                    "esmodules": true, // es модули 
                     "ie": "11" // Internet Explorer 11
             }
        },
    ],
];

module.exports = { presets };