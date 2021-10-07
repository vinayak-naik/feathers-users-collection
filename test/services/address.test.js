const assert = require('assert');
const app = require('../../src/app');

describe('\'address\' service', () => {
  it('registered the service', () => {
    const service = app.service('address');

    assert.ok(service, 'Registered the service');
  });
});
