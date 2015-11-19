'use strict';

const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const _ = require('lodash');

const ROOT = global.ROOT || path.join(__dirname, '..');
const SRC = path.join(ROOT, 'src');

const DEBUG = !process.argv.includes('--release');
const VERBOSE = process.argv.includes('--verbose');
const TESTS = process.argv.includes('--tests');
const WATCH = TESTS ? false : DEBUG; // Currently watch mode follows debug, it might be useful to watch in production mode

const GLOBALS = {
  'process.env.NODE_ENV': DEBUG ? '"development"' : '"production"',
  __DEV__: DEBUG,
  __TESTS__: TESTS
};

const AUTOPREFIXER_BROWSERS = [
  'Android 2.3',
  'Android >= 4',
  'Chrome >= 35',
  'Firefox >= 31',
  'Explorer >= 9',
  'iOS >= 7',
  'Opera >= 12',
  'Safari >= 7.1'
];

var JS_LOADER = {
  test: /\.jsx?$/,
  loader: 'babel',
  include: [SRC, path.join(ROOT, 'webpack')]
};

const base = {
  output: {
    publicPath: '/',
    sourcePrefix: '  '
  },

  cache: DEBUG,
  debug: DEBUG,

  stats: {
    colors: true,
    reasons: DEBUG,
    hash: VERBOSE,
    version: VERBOSE,
    timings: true,
    chunks: VERBOSE,
    chunkModules: VERBOSE,
    cached: VERBOSE,
    cachedAssets: VERBOSE
  },

  plugins: [
    new webpack.optimize.OccurenceOrderPlugin()
  ],

  resolve: {
    extensions: ['', '.webpack.js', '.web.js', '.babel.js', '.js', '.jsx']
  },

  module: {
    preLoaders: [{
      test: /\.jsx?$/,
      loaders: ['eslint'],
      include: [SRC]
    }],
    loaders: [
      {
        test: /\.json$/,
        loader: 'json'
      }, {
        test: /\.txt$/,
        loader: 'raw'
      }, {
        test: /\.(png|jpg|jpeg|gif|svg|woff|woff2)$/,
        loader: 'url?limit=10000'
      }, {
        test: /\.(eot|ttf|wav|mp3)$/,
        loader: 'file'
      }
    ]
  },

  // Eslint errors will stop the build
  eslint: {
    emitError: true
  },

  postcss: function plugins() {
    return [
      require('postcss-import')({
        onImport: files => files.forEach(this.addDependency)
      }),
      require('postcss-nested')(),
      require('postcss-cssnext')({autoprefixer: AUTOPREFIXER_BROWSERS})
    ];
  }
};

const client = _.merge({}, base, {
  entry: [
    ...(WATCH ? ['webpack-hot-middleware/client'] : []), // Necessary to allow Hot Module Reloading
    path.join(SRC, 'client/app.jsx')
  ],

  // Output is only used for packaging
  output: {
    path: path.join(ROOT, './build/client/'),
    filename: 'bundle.js',
    publicPath: '/'
  },

  devtool: DEBUG ? 'eval-cheap-module-source-map' : false,
  devServer: {
    host: '0.0.0.0',
    port: 8000
  },

  plugins: [
    ...base.plugins,
    new webpack.DefinePlugin(GLOBALS),
    ...(!DEBUG ? [
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: VERBOSE
        }
      }),
      new webpack.optimize.AggressiveMergingPlugin()
    ] : []),
    ...(WATCH ? [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoErrorsPlugin() // Do not perform HMR if an error was found
    ] : [])
  ],

  module: {
    loaders: [
      ...base.module.loaders,
      WATCH ? {
        ...JS_LOADER,
        query: {
          // Wraps all React components into arbitrary transforms
          // https://github.com/gaearon/babel-plugin-react-transform
          plugins: ['react-transform'],
          extra: {
            'react-transform': {
              transforms: [
                {
                  transform: 'react-transform-hmr',
                  imports: ['react'],
                  locals: ['module']
                }, {
                  transform: 'react-transform-catch-errors',
                  imports: ['react', 'redbox-react']
                }
              ]
            }
          }
        }
      } : JS_LOADER,
      {
        test: /\.css$/,
        loaders: ['style', 'css?importLoaders=1&modules', 'postcss']
      }
    ]
  }
});

const nodeModules = {};
fs.readdirSync(path.join(ROOT, 'node_modules'))
  .filter((x) => ['.bin'].indexOf(x) === -1)
  .forEach((mod) => nodeModules[mod] = `commonjs ${mod}`);

const server = _.merge({}, base, {
  entry: [
    path.join(SRC, 'server/server.js')
  ],

  target: 'node',

  node: {
    console: false,
    global: false,
    process: false,
    Buffer: false,
    __filename: false,
    __dirname: false
  },

  externals: nodeModules,

  // Output is only used for packaging
  output: {
    path: path.join(ROOT, './build/server/'),
    filename: 'server.js',
    libraryTarget: 'commonjs2'
  },

  devtool: 'source-map',

  plugins: [
    ...base.plugins,
    new webpack.DefinePlugin(GLOBALS),
    new webpack.BannerPlugin('require("source-map-support").install();', { raw: true, entryOnly: false }),
  ],

  module: {
    loaders: [
      ...base.module.loaders,
      JS_LOADER,
      {
        test: /\.css$/,
        loaders: ['css?importLoaders=1&modules', 'postcss']
      }
    ]
  }
});

module.exports = [client, server];