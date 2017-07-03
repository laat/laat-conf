const test = require('tape-promise/tape');
const loadJson = require('./loadJson');

test('load simple json', async (assert) => {
  assert.deepEqual(
    loadJson('./__test__/json/root.json')(),
    {'MY_VARIABLE': 'true'},
    'loads json'
  )
});
test('load json with non-existant key', async (assert) => {
  assert.deepEqual(
    loadJson('./__test__/json/no-key.json', { key: 'a.b' })(),
    {},
    'loads json, no key prop'
  )
});
test('load json with existant key', async (assert) => {
  assert.deepEqual(
    loadJson('./__test__/json/prop.json', { key: 'config' })(),
    {'MY_VARIABLE': 'true'},
    'loads json existant key prop'
  )
});
test('throws when value is not string', async (assert) => {
  assert.throws(loadJson('./__test__/json/intProp.json'), /value is not string/, 'throws')
})
