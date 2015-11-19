import { canUseDOM } from 'fbjs/lib/ExecutionEnvironment';

if (!canUseDOM) {
  // If not running on a browser environment, use jsdom
  const testdom = require('testdom');
  testdom('<html><body></body></html>');
}
