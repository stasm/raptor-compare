'use strict';

var gulp = require('gulp');
var mocha = require('gulp-mocha');
var eslint = require('gulp-eslint');

gulp.task('test', function () {
  return gulp.src('test/*.js', { read: false })
    .pipe(mocha({ ui: 'tdd' }));
});

gulp.task('lint', function () {
  return gulp.src(['src/**/*.js'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('default', ['lint', 'test'], function () {
});
