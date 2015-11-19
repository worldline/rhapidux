const context = require.context('../src/server/test', true, /\.jsx?$/);
context.keys().forEach(context);
