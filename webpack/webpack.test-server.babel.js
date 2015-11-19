const webpack = require('webpack');
const fs = require('fs');
const path = require('path');
const [, server] = require('./webpack.config.babel.js');

server.entry = path.join(__dirname, 'test-server.requires.js');
server.output.filename = 'test.bundle.js';

module.exports = server;
