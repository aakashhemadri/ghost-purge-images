const async = require('async');
const ghost = require('./lib/ghost');
const core = require('./lib/core');

module.exports = {
  run() {
    async.waterfall([
      function(callback) {
        async.parallel({
          uploads(cb) {
            ghost.uploads.list(cb);
          },
          content(cb) {
            ghost.content.fetch(cb);
          }
        }, callback);
      },
      function(out, callback) {
        core.filterUnused(out, callback);
      },
      function(out, callback) {
        core.purge(out, callback);
      }
    ], (err, out) => {
      if (err) {
        console.log(`❌ Error: ${err}`);
      }
      return process.exit(0);
    });
  }
};
