var _ = require('lodash');
var gulp = require('gulp');
var del = require('del');
var plug = require('gulp-load-plugins')();


var isProduction = function(file) {
  return process.env.NODE_ENV === 'production';
};

gulp.task('lib-clean', function (done) {
    del('./lib', done);
});

gulp.task('lib-compile', [ 'lib-clean' ], function(){
  return gulp.src([
    './src/**/*.js',
    './src/**/*.jsx',
    '!./src/preprocessor.js',
    '!./src/__tests__/**'
  ])
  .pipe(plug.plumber())
  .pipe(plug.babel({}))
  .pipe(plug.regexReplace({regex: "\\.jsx", replace: ''}))
  .pipe(plug.rename({ extname: '.js' }))
  .pipe(plug.if(isProduction, plug.stripDebug()))
  .pipe(gulp.dest('./lib'));
});

gulp.task('test', ['lib'], function () {
  return gulp.src('spec/*.js')
  .pipe(plug.jasmine({
    verbose: true,
    includeStackTrace: true
  }));
});

gulp.task('watch', ['lib'], function() {
  return gulp.watch(['./src/**/*.*'], ['lib', 'test']);
});

gulp.task('lib', ['lib-clean', 'lib-compile']);
gulp.task('default', ['lib']);