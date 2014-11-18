var gulp = require('gulp');

var paths = {
  src: {
    jsx: 'Scripts/App/Components/*.jsx',
    app: './Scripts/App/main.js',
    scripts: 'Scripts/**/*.js'
  },
  dest: {
    bundles: 'Scripts/dist',
    bundlesFilter: '!Scripts/dist/**/*.js',
    serverBundle: 'serverBundle.js',
    clientBundle: 'clientBundle.js',
    jsx: 'Scripts/App/Components'
  }
};

var source = require('vinyl-source-stream');
var streams = require('memory-streams');
var CombinedStream = require('combined-stream');
var os = require('os');
var createServerBundle = function (browserify, configPath) {
  var utils = {
    parseConfig : function(config) {
      if (config) {
        if (config.expose) {
          var components = {};
          //1. parse the configuration
          config.expose.forEach(function (component) {
            var path, name;

            if (typeof component === 'string') {
              path = component;
            }
            else {
              path = component.path;
              if (component.name) {
                name = component.name;
              }
            }
            if (name === undefined) {
              var splitted = path.split('/');
              name = splitted[splitted.length - 1];
            }
            components[name] = path;
          });
          return components;
        }
      }
    },
    exposeReact: function(exposedVariables, requires) {
      requires.push({ file: "react" });
      exposedVariables.append('var React = require("react");' + os.EOL);
    }
  };

  if (configPath === undefined) {
    configPath = './reactServerConfig.json';
  }
  var config = require(configPath);

  var serverComponents = utils.parseConfig(config);
  if (serverComponents) {
    var exposedVariables = CombinedStream.create();
    var requires = [];
    exposedVariables.append(';' + os.EOL);
    utils.exposeReact(exposedVariables, requires);

    for (var name in serverComponents) {
      var path = serverComponents[name];
      requires.push({file: path, expose: name});
      exposedVariables.append('var ' + name + ' = React.createFactory(require("' + name + '"));' + os.EOL);
    }
    browserify.require(requires);
    var bundleStream = CombinedStream.create();
    bundleStream.append(browserify.bundle());
    bundleStream.append(exposedVariables);

    return bundleStream;
  }
};

var browserify = require('browserify');
var gulpServerBundle = function () {
  var bundle = createServerBundle(browserify(
    {
      extensions: ['.jsx', '.js']
    }
  ));
  return bundle
    .pipe(source(paths.dest.serverBundle))
    .pipe(gulp.dest(paths.dest.bundles));
};

gulp.task('server-build', function () {
  return gulpServerBundle();
});

var gulpClientBundle = function () {
  var b = browserify(paths.src.app,
    {
      extensions: ['.jsx', '.js']
    });
  var bundle = createServerBundle(b);
  return bundle
    .pipe(source(paths.dest.clientBundle))
    .pipe(gulp.dest(paths.dest.bundles));
};

gulp.task('client-build', function () {
  return gulpClientBundle();
});

var watch = require('gulp-watch');
gulp.task('watch', function () {
  watch({glob: paths.src.jsx}, function (files) {
    return files.pipe(react())
      .pipe(gulp.dest(paths.dest.jsx));
  });

  watch({glob: [paths.src.scripts, paths.dest.bundlesFilter]}, function () {
    return gulpClientBundle();
  });
});

gulp.task('default', ['watch']);

