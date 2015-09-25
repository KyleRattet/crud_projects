var gulp = require('gulp');
var jshint = require('gulp-jshint');
var connect = require('gulp-connect');

// configure connect task
gulp.task('connect', function() {
  connect.server({
    root: 'server/app.js', // update path!!
    livereload: true
  });
});

gulp.task('html', function () {
  gulp.src('server/views/*.html')
    .pipe(connect.reload());
});

gulp.task('css', function () {
  gulp.src('client/public/css/*.css')
    .pipe(connect.reload());
});

// configure jshint task
gulp.task('jshint', function() {
  return gulp.src('client/public/js/*.js') // update path!
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

// configure which files to watch and what tasks to use on file changes
gulp.task('watch', function() {
  gulp.watch('client/publicjs/*.js', ['jshint']);
  gulp.watch(['server/views/*.html'], ['html']);
  gulp.watch(['client/public/css/*.css'], ['css']); // update path!
});

// default task!
gulp.task('default', ['watch', 'connect', 'jshint']);
