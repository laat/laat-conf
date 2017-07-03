const debug = require('debug')('laat-conf');

module.exports = function getConfig (...sources) {
  let forceDefault = true
  if (sources[sources.length - 1] && sources[sources.length - 1].forceDefault === false) {
    sources = sources.slice(0, sources.length - 1);
    forceDefault = false;
  }
  const config = sources.reduce((config, source) => Object.assign(config, source()), {});
  debug('final config %O', config);
  return function get(key, opts) {
    if (opts != null && !(opts instanceof Object)){
      throw new Error('opts must be an object');
    }
    if (opts && opts.default) {
      return config[key] || opts.default;
    } else {
      const value = config[key];
      if (value == null) {
        if (forceDefault === false) {
          console.error(`WARN: Config variable ${key} is not set`);
        } else {
          throw new Error(`Config variable ${key} is not defined`);
        }
      }
      return value || '';
    }
  }
}
