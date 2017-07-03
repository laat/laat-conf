const test = require('tape-promise/tape');
const getConfig = require('.');
const loadYaml = require('./loadYaml');
const loadJson = require('./loadJson');
const loadDotenv = require('./loadDotenv');
const loadEnv = require('./loadEnv');

test('getConfig', async (assert) => {
  process.env.PROCESS_ENV_VAR='true';
  const get = getConfig(
    loadYaml('./__test__/many_configs/config.yml'),
    loadJson('./__test__/many_configs/config.json'),
    loadDotenv('./__test__/many_configs/config.env'),
    loadEnv(),
  );
  const config = {
    yaml: get('YAML_VAR'),
    json: get('JSON_VAR'),
    dotenv: get('ENV_VAR'),
    penv: get('PROCESS_ENV_VAR'),
    defaultValue: get('DOES_NOT_EXIST_111', { default: 'true' })
  }
  assert.deepEqual(config, {
    yaml: 'true',
    json: 'true',
    dotenv: 'true',
    penv: 'true',
    defaultValue: 'true'
  }, 'should load config')
  assert.throws(() => get('FOOBAR', 'illegal arg'), 'illegal arg throws')
  assert.throws(() => get('DOES_NOT_EXIST_111'), 'non-default non-existant throws')
  assert.equals(get('OVERRIDES'), 'dotenv', 'latest config loaded has presidence if conflict')
})
test('getConfig', async (assert) => {
  const get = getConfig(loadJson('./__test__/json/root.json'), { forceDefault: false })
  assert.doesNotThrow(() => get('DOES_NOT_EXIST_111'), 'non-default non-existant does not throw')
  assert.deepEqual(
    loadJson('./__test__/json/root.json')(),
    {'MY_VARIABLE': 'true'},
    'loads json'
  )
});
