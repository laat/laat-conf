const debug = require('debug')('laat-conf');
const loadJson = require('load-json-file');
const deepValue = require('./utils/deepValue');


module.exports = function loadJsonFile(src, opts) {
  return function () {
    debug('loadJsonFile trying to load %s', src)
    let vars = loadJson.sync(src);
    if (opts && opts.key) {
      vars = deepValue(vars, opts.key) || {};
    }
    if (!vars instanceof Object) {
      throw new Error(`Could not load config ${src}: ${vars} is not Object`);
    }
    for (const key of Object.keys(vars)) {
      const value = vars[key];
      if (typeof value !== 'string') {
        debug('loadJsonFile %s: key: %s, value: %s. Value is not string', src, key, value);
        throw new Error(`Could not load conifg ${src}: [key: ${key}, value: ${value}] value is not string`);
      }
    }
    debug(`loadJsonFile loaded config %s: %O`, src, vars)
    return vars;
  }
}
