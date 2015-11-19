import React from 'react';
import { renderToString } from 'react-dom/server';
import Html from '../../../client/html.jsx';
import Root from '../../../client/components/root/root.jsx';

const register = function(server, options, next) {

  server.route({
    method: 'GET',
    path: '/bundle.js',
    handler: {
      file: '../client/bundle.js'
    }
  });

  server.route({
    method: 'GET',
    path: '/{p*}',
    handler(request, reply) {
      // Build the nodes as strings to be able to remount it client-side
      const note = renderToString(<Root />);
      const html = renderToString(<Html state={`window.state = ${JSON.stringify({})}`} remount={note} />);
      reply(`<!DOCTYPE html>${html}`);
    }
  });

  next();

};

register.attributes = {
  name: 'core',
  version: '1.0.0'
};

export default register;
