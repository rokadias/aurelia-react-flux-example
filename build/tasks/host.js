var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var runSequence = require('run-sequence');

/*
  Task to start up the server with nodemon and
  rebuild/restart if any source changes
 */
gulp.task('host', ['build-bundle'], function() {
  nodemon({
    ext: 'js',
    script: './dist/server.js',
    tasks: ['build']
  });
});
