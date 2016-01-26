var gulp = require('gulp');
var bundler = require('aurelia-bundler');
var runSequence = require('run-sequence');

var config = {
  force: true,
  packagePath: '.',
  bundles: {
    "dist/aurelia": {
      includes: [
        'aurelia-bootstrapper',
        'aurelia-fetch-client',
        'aurelia-router',
        'aurelia-animator-css',
        'github:aurelia/templating-binding',
        'github:aurelia/templating-resources',
        'github:aurelia/templating-router',
        'github:aurelia/loader-default',
        'github:aurelia/history-browser',
        'github:aurelia/logging-console'
      ],
      options: {
        inject: true,
        minify: true
      }
    },
    "dist/app-build": {
      includes: [
        'src/*',
        '**/*.html!text',
        '**/*.css!text'
      ],
      options: {
        inject: true,
        minify: false
      }
    }
  }
};

gulp.task('bundle', function() {
 return bundler.bundle(config);
});

gulp.task('unbundle', function() {
 return bundler.unbundle(config);
});

gulp.task('build-bundle', function(callback) {
  return runSequence(
    'build',
    'bundle',
    callback
  );
});
