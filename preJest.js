var to5 = require("6to5-core");

module.exports = {
  process: function(src, filename) {
    return to5.transform(src, {filename: filename, experimental: true}).code;
  }
};
