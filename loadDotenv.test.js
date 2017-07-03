const test = require('tape-promise/tape');
const loadDotenv = require('./loadDotenv');

test('loadDotenv', async (assert) => {
  assert.deepEqual(
    loadDotenv('./__test__/.env')(),
    {'MY_VARIABLE': 'true'},
    'loads .env files'
  )
})
