module.exports = function(config) {
    var sauceLaunchers = require('./sauceLaunchers');

    config.set({
        logLevel: 'LOG_DEBUG',

        reporters: ['saucelabs', 'dots'],

        autoWatch : false,

        frameworks: [
            'mocha',
            'browserify'
        ],

        files: [
            '../../node_modules/babel-polyfill/dist/polyfill.js',
            '../shims/phantomjs-shims.js',
            '../*.spec.js'
        ],

        preprocessors: {
            '../shims/phantomjs-shims.js': ['browserify'],
            '../*.spec.js': ['browserify']
        },

        browserify: {
            debug: true,
            transform: ['babelify']
        },

        sauceLabs: {
            "public": "public",
            testName: 'RefluxJS Core Karma Tests (Travis)',
            recordVideo: false,
            recordScreenshot: false,
            startConnect: false,
            tunnelIdentifier: process.env.TRAVIS_JOB_NUMBER,
            connectOptions: {
                port: 5757,
                logfile: "sauce_connect.log"
            }
        },

        customLaunchers: sauceLaunchers,
        browsers: Object.keys(sauceLaunchers),
        singleRun: true,
        captureTimeout: 0

    });
};
