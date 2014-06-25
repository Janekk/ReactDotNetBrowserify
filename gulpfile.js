var gulp = require('gulp');

var paths = {
  src: {
    jsx: 'Scripts/App/Components/*.jsx',
    app: './Scripts/App/main.js',
    scripts: 'Scripts/**/*.js'
  },
  dest: {
    scripts: 'Scripts/Build',
    bundle: 'serverBundle.js',
    jsx: 'Scripts/App/Components'
  }
};

var fs = require('fs');
var source = require('vinyl-source-stream');
var streams = require('memory-streams');
var CombinedStream = require('combined-stream');
var ExposeOnServer = function (browserify, configPath) {

  function exposeModule(componentsFile, name, path) {
    browserify.require(path, { expose: name });
    componentsFile.append('var ' + name + ' = require("' + name + '");' + eol);
  }

  var eol = require('os').EOL;
  if (configPath === undefined) {
    configPath = './reactServerConfig.json';
  }
  var config = require(configPath);

  if (config) {
    if (config.componentsFile) {
      if (config.expose) {
        var components = {};

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
        //console.log(components);

        for (var name in components) {
          browserify.add(components[name]);
        };

        var componentsFile = CombinedStream.create();
        componentsFile.append(';' + eol);
        exposeModule(componentsFile, 'React', 'react')

        for (var name in components) {
          var path = components[name];
          console.log(path + ' ' + name);
          exposeModule(componentsFile, name, path);
        };

        var bundleFile = CombinedStream.create();
        bundleFile.append(browserify.bundle());
        bundleFile.append(componentsFile);
        bundleFile
          .pipe(source(paths.dest.bundle))
          .pipe(gulp.dest(paths.dest.scripts));
      }
    }
  }
}

var browserify = require('browserify');
var source = require('vinyl-source-stream');

var react = require('gulp-react');
var eol = require('gulp-eol');
gulp.task('react', function () {
  gulp.src(paths.src.jsx)
    .pipe(react())
    .pipe(eol())
    .pipe(gulp.dest(paths.dest.jsx));
});

gulp.task('browserify', function () {
  ExposeOnServer(browserify());
});

gulp.task('build', ['react', 'browserify']);

