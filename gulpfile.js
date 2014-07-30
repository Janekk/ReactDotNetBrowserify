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
  function parseConfig(config) {
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
  }

  function exposeModule(exposedVariables, name, path) {
    browserify.require(path, { expose: name });
    exposedVariables.append('var ' + name + ' = require("' + name + '");' + os.EOL);
  }

  if (configPath === undefined) {
    configPath = './reactServerConfig.json';
  }
  var config = require(configPath);

  var serverComponents = parseConfig(config);
  if (serverComponents) {
    var exposedVariables = CombinedStream.create();
    exposedVariables.append(';' + os.EOL);
    exposeModule(exposedVariables, 'React', 'react')

    for (var name in serverComponents) {
      var path = serverComponents[name];
      browserify.add(path);
      exposeModule(exposedVariables, name, path);
    }

    var bundleStream = CombinedStream.create();
    bundleStream.append(browserify.bundle());
    bundleStream.append(exposedVariables);

    return bundleStream;
  }
}

var react = require('gulp-react');
gulp.task('react', function () {
  return gulp.src(paths.src.jsx)
    .pipe(react())
    .pipe(gulp.dest(paths.dest.jsx));
});

var browserify = require('browserify');
var gulpServerBundle = function () {
  var bundle = createServerBundle(browserify());
  return bundle
    .pipe(source(paths.dest.serverBundle))
    .pipe(gulp.dest(paths.dest.bundles));
}
gulp.task('server-build', ['react'], function () {
  return gulpServerBundle();
});

var gulpClientBundle = function () {
  var b = browserify(paths.src.app);
  var bundle = createServerBundle(b);
  return bundle
    .pipe(source(paths.dest.clientBundle))
    .pipe(gulp.dest(paths.dest.bundles));
}
gulp.task('client-build', ['react'], function () {
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

