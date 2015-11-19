import Path from 'path';
import webpack from 'webpack';
import WebpackPlugin from 'hapi-webpack-plugin';

const register = function(server, options, next) {
  global.ROOT = Path.join(__dirname, '../..');
  const [clientConfig] = require('../../../../webpack/webpack.config.babel.js');
  const compiler = webpack(clientConfig);

  server.register({
    register: WebpackPlugin,
    options: {
      compiler,
      assets: {
        noInfo: true,
        publicPath: clientConfig.output.publicPath,
        stats: clientConfig.stats
      },
      hot: {}
    }
  }, next);
};

register.attributes = {
  name: 'hmr',
  version: '1.0.0'
};

export default register;
