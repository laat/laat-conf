const debug = require('debug')('laat-conf');

module.exports = function loadEnv() {
  return function () {
    debug('loading processEnv %O', process.env);
    return JSON.parse(JSON.stringify(process.env));
  }
}
