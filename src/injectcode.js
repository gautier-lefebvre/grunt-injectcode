'use strict';

const injector = require('inject-code');

module.exports = (grunt) => {
  grunt.registerMultiTask('injectcode', 'Inject code into files', function () {
    // Merge task-specific and/or target-specific options with these defaults.
    const options = this.options({
      starttag: `// injectcode:${this.name}`,
      endtag: '// endinjectcode',

      transform: (filepaths) => {}
    });

    this.files.forEach(f => {
      const src = f.src.filter(filePath => grunt.file.exists(filePath));
      const transformed = options.transform(src);

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
