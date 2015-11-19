const context = require.context('../src/client/test', true, /\.spec\.jsx?$/);
context.keys().forEach(context);
