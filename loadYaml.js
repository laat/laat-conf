const fs = require('fs');
const debug = require('debug')('laat-conf');
const yaml = require('js-yaml');
const deepValue = require('./utils/deepValue');

module.exports = function loadYaml (src, opts) {
  return function () {
    debug('loadYaml trying to load %s', src)
    let vars = yaml.safeLoad(fs.readFileSync(src)) || {}
    if (opts && opts.key) {
      vars = deepValue(vars, opts.key) || {};
    }
    if (!vars instanceof Object) {
      throw new Error(`Could not load config ${src}: ${vars} is not Object`);
    }
    for (const key of Object.keys(vars)) {
      const value = vars[key];
      if (typeof value !== 'string') {
        debug('loadYaml %s: key: %s, value: %s. Value is not string', src, key, value);
        throw new Error(`Could not load conifg ${src}: [key: ${key}, value: ${value}] value is not string`);
      }
    }
    debug(`loadYaml loaded config %s: %O`, src, vars)
    return vars;
  }
};
