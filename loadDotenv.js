const debug = require('debug')('laat-conf');
const fs = require('fs');
const dotenv = require('dotenv');

module.exports = function loadDotenv (src) {
  return function () {
    debug('loadDotenv trying to load %s', src)
    const vars = dotenv.parse(fs.readFileSync(src));
    debug('loadDotenv loaded config %s: %O', src, vars)
    return vars;
  }
};
