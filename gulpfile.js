"use strict"

var gulp = require('gulp')
var connect = require('gulp-connect') //Run a local dev server
var open = require('gulp-open') //open url on web browser

var config = {
  port: 9005,
  devBaseUrl: "http://localhost",
  paths: {
    html: './src/*.html',
    dist: './dist'
  }
};

//start local dev server
gulp.task('connect', function(){
  connect.server({
    root: ['dist'],
    port: config.port,
    base: config.devBaseUrl,
    livereload: true
  });
});

//will run connect before to run open
gulp.task('open', ['connect'], function(){
  gulp.src('dist/index.html')
  .pipe(open({uri: config.devBaseUrl + ':' + config.port + '/'}));
});

gulp.task('html', function(){
  gulp.src(config.paths.html)//get any html
  .pipe(gulp.dest(config.paths.dist))//and put them on the destination path
  .pipe(connect.reload());//reload using connect
});

gulp.task('watch', function(){
  gulp.watch(config.paths.html, ['html']);
});

gulp.task('default', ['html', 'open', 'watch']);
