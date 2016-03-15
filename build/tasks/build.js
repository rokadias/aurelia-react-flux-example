var gulp = require('gulp');
var runSequence = require('run-sequence');
var changed = require('gulp-changed');
var plumber = require('gulp-plumber');
var to5 = require('gulp-babel');
var sourcemaps = require('gulp-sourcemaps');
var paths = require('../paths');
var compilerOptions = require('../babel-options');
var assign = Object.assign || require('object.assign');

// transpiles changed es6 files to SystemJS format
// the plumber() call prevents 'pipe breaking' caused
// by errors from other gulp plugins
// https://www.npmjs.com/package/gulp-plumber
gulp.task('build-system', function () {
  return gulp.src(paths.source)
    .pipe(plumber())
    .pipe(changed(paths.output, {extension: '.js'}))
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(to5(compilerOptions))
    .pipe(sourcemaps.write({includeContent: true}))
    .pipe(gulp.dest(paths.output));
});

// transpiles changed jsx files to systemjs format
// and changes extension to .jsx.js
gulp.task('build-jsx', function() {
  return gulp.src(paths.sourceJsx)
    .pipe(plumber())
    .pipe(changed(paths.output, {extension: '.jsx'}))
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(to5(compilerOptions))
    .pipe(sourcemaps.write({includeContent: true}))
    .pipe(gulp.dest(paths.output));
});

// copies changed html files to the output directory
gulp.task('build-html', function () {
  return gulp.src(paths.html)
    .pipe(changed(paths.output, {extension: '.html'}))
    .pipe(gulp.dest(paths.output));
});

/*
  Task to compile server js code with babel
 */
gulp.task('build-server', function () {
  return gulp.src(paths.serverSource)
    .pipe(plumber())
    .pipe(changed(paths.output, {extension: '.js'}))
    .pipe(sourcemaps.init())
    .pipe(to5(assign({}, compilerOptions, { plugins: ['transform-es2015-modules-commonjs'] })))
    .pipe(sourcemaps.write({includeContent: false}))
    .pipe(gulp.dest(paths.output));
});

// copies changed json files to the output directory
gulp.task('build-json', function() {
  return gulp.src(paths.json)
    .pipe(changed(paths.output, {extension: '.json'}))
    .pipe(gulp.dest(paths.output));
});

// this task calls the clean task (located
// in ./clean.js), then runs the build-system
// and build-html tasks in parallel
// https://www.npmjs.com/package/gulp-run-sequence
gulp.task('build', function(callback) {
  return runSequence(
    'clean',
    ['build-system', 'build-jsx', 'build-html', 'build-server', 'build-json'],
    callback
  );
});
