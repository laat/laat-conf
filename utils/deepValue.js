module.exports = function deepValue(obj, path){
    for (var i=0, path=path.split('.'), len=path.length; i<len; i++){
      if (obj[path[i]] == null) {
        return {};
      }
      obj = obj[path[i]];
    };
    return obj;
};
