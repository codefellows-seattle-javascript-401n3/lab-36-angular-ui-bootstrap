const webpack= require('./webpack.config.js');
webpack.entry = {};

module.exports = function(config) {
  config.set({
    webpack,
    port: 9876,
    colors: true,
    basePath: '',
    autoWatch: true,
    singleRun: false,
    concurrency: Infinity,
    frameworks: ['jasmine'],
    reporters: ['mocha'],
    browsers: ['Chrome'],
    logLevel: config.LOG_INFO,
    preprocessors: {
      '!(node_modules/)/**/*.js': ['eslint'],
      'test/**/*-test.js': ['webpack'],
      'app/index.js': ['webpack'],
    },
    files: [
      'app/index.js',   // injection of angular
      'test/**/*-test.js',
      'node_modules/angular-mocks/angular-mocks.js',  // injection of angular-mocks
    ],
  });
};
