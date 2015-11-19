import Server from '../../server';
import { expect } from 'code';

describe('Core API', () => {

  it('should serve the index', async () => {
    const server = await Server.start();
    const response = await server.injectThen('/');
    expect(response.result).to.startWith('<!DOCTYPE html>');
  });

});
