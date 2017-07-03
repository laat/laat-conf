const test = require('tape-promise/tape');
const loadYaml = require('./loadYaml');

test('load simple yaml', async (assert) => {
  assert.deepEqual(
    loadYaml('./__test__/yaml/root.yml')(),
    {'MY_VARIABLE': 'true'},
    'loads yaml'
  )
});
test('load yaml with non-existant key', async (assert) => {
  assert.deepEqual(
    loadYaml('./__test__/yaml/no-key.yml', { key: 'a.b' })(),
    {},
    'loads yaml, no key prop'
  )
});
test('load yaml with existant key', async (assert) => {
  assert.deepEqual(
    loadYaml('./__test__/yaml/prop.yml', { key: 'env_variables' })(),
    {'MY_VARIABLE': 'true'},
    'loads yaml existant key prop'
  )
});
test('throws when value is not string', async (assert) => {
  assert.throws(loadYaml('./__test__/yaml/intProp.yml'), /value is not string/, 'throws')
})
