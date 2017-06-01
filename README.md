# grunt-injectcode

> Inject code into files

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-injectcode --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-injectcode');
```

## The "injectcode" task

### Overview
In your project's Gruntfile, add a section named `injectcode` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  injectcode: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
});
```

### Options

#### options.starttag
Type: `String`
Default value: `'// injectcode:{your_target}'`

Start tag of the zone where to inject the content.

#### options.endtag
Type: `String`
Default value: `'// endinjectcode'`

End tag of the zone where to inject the content.

#### options.transform
Type: `Function`
Default value: `function (filePaths: String[]) => ""`

The function taking the filePaths of all matching files and returning the content to inject between the tags, as a string.

### Usage Examples

In this example, we inject content based on the path of files into `dest.js`.

#### dest.js file content before
```js
module.exports = {
  files: (
    // injectcode:your_target
    // endinjectcode
  )
};
```

#### task config
```js
grunt.initConfig({
  injectcode: {
    your_target: {
      options: {
        starttag: '// injectcode:your_target',
        endtag: '// endinjectcode',

        transform: filePaths => {
          return '[ ' + filePaths.map(filePath => "'" + filePath + "'").join(', ') + ' ]';
        }
      }

      files: {
        'dest.js': ['src/foo.js', 'src/bar.js'],
      },
    }
  },
});
```

#### dest.js result
```js
module.exports = {
  files: (
    // injectcode:your_target
    [ 'src/foo.js', 'src/bar.js' ]
    // endinjectcode
  )
};
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_
