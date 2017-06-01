'use strict';

var injector = require('inject-code');

module.exports = function (grunt) {
  grunt.registerMultiTask('injectcode', 'Inject code into files', function () {
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      starttag: '// injectcode:' + this.name,
      endtag: '// endinjectcode',

      transform: function transform(filepaths) {}
    });

    this.files.forEach(function (f) {
      var src = f.src.filter(function (filePath) {
        return grunt.file.exists(filePath);
      });
      var transformed = options.transform(src);

      injector(transformed, {
        into: f.dest,
        between: {
          starttag: options.starttag,
          endtag: options.endtag
        }
      });
    });
  });
};