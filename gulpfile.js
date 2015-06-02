var gulp = require( 'gulp' );
var jshint = require( 'gulp-jshint' );

var paths = {
  src: './src/**/*.js',
  test: './test/**/*.js'
};

gulp.task( 'lint', function() {
  gulp.src( [paths.src, paths.test] )
    .pipe( jshint({lookup: true}) )
    .pipe( jshint.reporter('default') );
});