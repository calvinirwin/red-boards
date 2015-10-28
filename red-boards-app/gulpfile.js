var gulp = require('gulp'),
  jshint = require('gulp-jshint'),
  stylish = require('jshint-stylish'),
  livereload = require('gulp-livereload');

// Build site script file
// Import each module file
// each file contains 1 obj
// JS hint final output
gulp.task('scripts', function() {
  gulp.src(['./*.js', './models/*.js', './public/javascripts/*.js', './routes/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter(stylish, {
      verbose: true
    }));
});


// default gulp task
gulp.task("default", ["scripts"], function() {
  // watch for HTML changes
  // gulp.watch('./src/*.html', ["htmlpage"]);

  // watch for JS changes
  gulp.watch('./src/scripts/*.js', ["scripts"]);
  gulp.watch('./*.js', ["scripts"]);
  gulp.watch('./models/*.js', ["scripts"]);
  gulp.watch('./routes/*.js', ["scripts"]);

  // watch for CSS changes
  // gulp.watch('./src/styles/*.css', ["styles"]);
});