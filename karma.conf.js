'use strict';
const webpack = require('webpack');
const path = require('path');

require("babel/register");

// Set to true for watch mode
let watchMode = false;

// Must be the same as mocha's command
const reactTests = './webpack/test-client.requires.js';

// Reuse existing webpack configuration with some overloads
let webpackConf = Object.assign({}, require('./webpack/webpack.config.babel.js')[0], {
  devtool: 'inline-source-map',
  noInfo: true,
  watch: watchMode,
  plugins: [
    // Ignore jsdom and testdom because they are not relevant in Karma
    new webpack.IgnorePlugin(/(test|js)dom$/),
    new webpack.NoErrorsPlugin()
  ]
});

webpackConf.module.noParse = [ /node_modules\/sinon/ ];

// Removes output and entries because they are handled by Karma
delete webpackConf.output;
delete webpackConf.entry;

// Add isparta loader for ES7 code coverage
webpackConf.module.loaders.push({
  test: /\.jsx?$/,
  include: path.resolve('src/'),
  loader: 'isparta'
});

module.exports = function(config) {
  config.set({
    // Add more browser here
    browsers: ['Chrome'],
    singleRun: !watchMode,
    frameworks: ['mocha'],
    files: [reactTests],
    preprocessors: {
      [reactTests]: ['webpack', 'sourcemap']
    },
    reporters: ['progress', 'coverage'],
    webpack: webpackConf,
    webpackMiddleware: {
      noInfo: true
    }
  });
};
