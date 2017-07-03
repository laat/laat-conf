# laat-conf

This package is a description of how I configure my applications.

This is mostly extracted from existing applications. Contains some functions to
implement the pattern.

## Motivation

Application configuration, in a 12 factor app, should be read from the
environment. However, depending on cloud-provider it is often difficult to
manage configuration as environment variables. Common workarounds are **yaml**,
**json**, or **.env** files.

In immature organizations when releasing an application, new config variables
are often forgotten. This implementation will throw an exception if config
variables are not set. The application should crash at boot time if some
variable is not configured.

I also want a type-safe and auto-completable config. By exporting an object with
the type signature `{[key:string]:string}` I get this in most JS editors.

## Usage

A small example:
`config.js`:
```js
const getConfig = require('laat-conf');
const loadEnv = require('laat-conf/loadEnv');
const loadJson = require('laat-conf/loadJson');

const get = getConfig(
  loadJson('config.json'),
  loadEnv()
); // order matters, latest overrides

module.exports = {
    PORT: get('PORT', { default: '8080' }) // if not found, return 8080
    db: {
        username: get('DB_USERNAME') // throws if not found
        password: get('DB_PASSWORD') // throws if not found
    }
};
```

A humongous example:
`config.js`:
```js
const loadYaml = require('laat-conf/loadYaml');
const loadJson = require('laat-conf/loadJson');
const loadEnv = require('laat-conf/loadEnv');
const loadDotenv = require('laat-conf/loadDotenv');
const getConfig = require('laat-conf');

const get = getConfig(
  () => ({ // all loaders are functions that returns an Object
      SOME_DEFAULT_VALUE: 'true'
  }),
  loadYaml('app.yml', key: 'env_variables'), // env vars is found at the key
  loadJson('package.json', key: 'config'), // env vars is found at the key
  loadJson('config.json'), // the whole JSON file is the config
  loadDotenv('.env') // KEY=value file, with # comments
  loadEnv(), // process.env
  // Order matters, latest overrides.
  { forceDefault: process.env.NODE_ENV !== 'production' } // sometimes convenient
);

module.exports = {
    PORT: get('PORT', { default: '8080' }) // if not found, return 8080
    db: {
        username: get('DB_USERNAME') // throws if not found
        password: get('DB_PASSWORD') // throws if not found
    }
    someDefaultValue: get('SOME_DEFAULT_VALUE') // does not throw, because it is defined in getConfig()
};
```

## Configfiles

I like all config-approaches to follow the unix environment variable naming
convention, regardless of file format.

`config.json`:
```json
{
  "DJANGO_SETTINGS_MODULE": "myapp.settings"
}
```

`package.json`
```json
{
  "config": {
    "DJANGO_SETTINGS_MODULE": "myapp.settings"
  }
}
```

`app.yml`
```yaml
env_variables:
  DJANGO_SETTINGS_MODULE: 'myapp.settings'
```

`.env`
```bash
DJANGO_SETTINGS_MODULE=myapp.settings
```

`process.env`
```bash
DJANGO_SETTINGS_MODULE=myapp.settings node server.js
```
