const webpack = require('webpack');
const fs = require('fs');
const path = require('path');
const [client] = require('./webpack.config.babel.js');

// TODO find how to use that to make mocha-loader pass in node
/*const nodeModules = {};
fs.readdirSync(path.join(__dirname, '../node_modules'))
  .filter((x) => ['.bin'].indexOf(x) === -1)
  .forEach((mod) => nodeModules[mod] = `commonjs ${mod}`);*/

client.entry = [
  'webpack/hot/dev-server',
  `mocha!${path.join(__dirname, './test-client.requires.js')}`
];
client.output.filename = 'test.bundle.js';
client.plugins.push(new webpack.IgnorePlugin(/(test|js)dom$/));
client.devtool = 'inline-source-map';
client.module.noParse = [ /node_modules\/sinon/ ];
// client.externals = nodeModules;

module.exports = client;
