"use strict";

var gulp = require('gulp');
var connect = require('gulp-connect'); //Run a local dev server
var open = require('gulp-open'); //open url on web browser
var browserify = require('browserify'); //bundles
var reactify = require('reactify'); //transforms react jsx to js
var source = require('vinyl-source-stream'); //use conventional text streams with gulp
var concat = require('gulp-concat');//concats files
var lint = require('gulp-eslint');//lint js files including jsx

var config = {
  port: 9005,
  devBaseUrl: "http://localhost",
  paths: {
    html: './src/*.html',
    js: '.src/**/*.js',
    css:[
      'node_modules/bootstrap/dist/css/bootstrap.min.css',
      'node_modules/bootstrap/dist/css/bootstrap-theme.min.css'
    ],
    dist: './dist',
    mainJs: './src/main.js'
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

gulp.task('js', function(){
  browserify(config.paths.mainJs)
  .transform(reactify)
  .bundle()
  .on('error', console.error.bind(console))
  .pipe(source('bundle.js'))
  .pipe(gulp.dest(config.paths.dist + '/scripts'))
  .pipe(connect.reload());
});

gulp.task('css', function(){
  gulp.src(config.paths.css)
  .pipe(concat('bundle.css'))
  .pipe(gulp.dest(config.paths.dist + '/css'))
});

gulp.task(lint, function(){
  return gulp.src(config.paths.js)
  .piple(eslint({config: 'eslint.config.json'}))
  .pipe(eslint.format());
});

gulp.task('watch', function(){
  gulp.watch(config.paths.html, ['html']);
  gulp.watch(config.paths.js, ['js']);
  gulp.watch(config.paths.css, ['css']);
});

gulp.task('default', ['html', 'js', 'css', 'open', 'watch']);
