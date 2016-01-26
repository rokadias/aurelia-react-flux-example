var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var paths = require('../paths');

// this task utilizes nodemon
// to create a dev server instance
// at http://localhost:9000
gulp.task('serve', ['build'], function(done) {
  nodemon({
    watch: [
      paths.source,
      paths.html,
      paths.serverSource,
      paths.style,
      paths.json
    ],
    script: './dist/server.js',
    tasks: ['build']
  });
});
