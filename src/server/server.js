import 'babel-core/polyfill';
import { Server } from 'hapi';

const start = async function start() {

  const server = new Server({
    connections: {
      routes: {
        files: {
          relativeTo: __dirname
        }
      }
    }
  });
  const connection = server.connection({ host: '0.0.0.0', port: 8080, labels: ['api'] });

  const register = function register(plugin, options = {}) {
    return new Promise((resolve, reject) => {
      server.register(plugin, options, (err) => err ? reject(err) : resolve());
    });
  };

  await register(require('inert'));

  if (__DEV__ && !__TESTS__) {
    await register(require('./modules/hmr'));
  }

  await register(require('./modules/core'));

  if (__TESTS__) {
    await register(require('inject-then'));
  }

  const creation = new Promise((resolve, reject) => {
    server.start((err) => {
      if (err) {
        return reject(err);
      }

      console.log(`Server running at: ${connection.info.uri}`);
      resolve();
    });
  });

  await creation;

  return server;
};

export default { start };
