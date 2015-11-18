module.exports = function(config) {
    var sauceLaunchers = require('./sauceLaunchers');

    config.set({
        logLevel: 'LOG_DEBUG',

        singleRun : true,
        autoWatch : false,

        reporters: ['saucelabs', 'dots'],

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
            "public": "team",
            testName: 'RefluxJS Core Karma Tests (Dev)',
            recordVideo: false,
            recordScreenshot: false,
            tunnelIdentifier: process.env.TRAVIS_JOB_NUMBER,
        },

        customLaunchers: sauceLaunchers,
        browsers: Object.keys(sauceLaunchers),
        captureTimeout: 0
    });
};
