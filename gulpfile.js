'use strict'

////////////////////////////////////////////////////////////////////////////////
// Modules
////////////////////////////////////////////////////////////////////////////////
var gulp = require('gulp');                 // Gulp.
var gutil = require('gulp-util');           // Gulp utilities.
var uglify = require('gulp-uglify');        // Uglify for JS.
var connect = require('gulp-connect');      // Webserver.
var sass = require('gulp-sass');            // SASS.
var webpack = require('webpack-stream');    // Webpack.
var minifycss = require('gulp-clean-css');  // Minify css.
var path = require('path');

////////////////////////////////////////////////////////////////////////////////
// Paths
////////////////////////////////////////////////////////////////////////////////
var srcPath = './src/';
var destPath = './dist/';
var modulesPath = './node_modules/';

////////////////////////////////////////////////////////////////////////////////
// Production/Development wrapper functions.
////////////////////////////////////////////////////////////////////////////////
var production = function(f) {
  return gutil.env.env == 'production' ? f : gutil.noop()
};

var development = function(f) {
  return gutil.env.env == 'development' ? f : gutil.noop()
};

////////////////////////////////////////////////////////////////////////////////
// Tasks.
////////////////////////////////////////////////////////////////////////////////

// JSX
gulp.task('jsx', function() {
  gulp.src(srcPath + 'js/index.jsx')
    .pipe(webpack({
      resolve: {
        root: [
          path.resolve('./src/data')
        ]
      },
      module: {
        loaders: [
          {
            test: /\.jsx$/,
            loader: 'babel',
            query: {
              presets: ['es2015', 'react']
            }
          }
        ]
      },
      output: {
        filename: 'app.js'
      }
    }))
    .pipe(production(uglify())) // Uglify in production only.
    .pipe(gulp.dest(destPath + 'js/'))
    .pipe(connect.reload());
});

// Compile .scss and move.
gulp.task('stylesheets', function() {
  gulp.src(srcPath + 'css/**/*')
    .pipe(sass().on('error', sass.logError))
    .pipe(production(minifycss())) // Minify in production only.
    .pipe(gulp.dest(destPath + 'css/'))
    .pipe(connect.reload());
});

// Move .html.
gulp.task('html', function() {
  gulp.src(srcPath + '*.html')
    .pipe(gulp.dest(destPath))
    .pipe(connect.reload());
});

////////////////////////////////////////////////////////////////////////////////
// Webserver
////////////////////////////////////////////////////////////////////////////////
gulp.task("webserver", function() {
  connect.server({
    root: 'dist',
    livereload: true,
    port: 8080
  });
});

////////////////////////////////////////////////////////////////////////////////
// Watch task
////////////////////////////////////////////////////////////////////////////////
gulp.task('watch', function() {
  gulp.watch(srcPath + 'js/**/*.jsx', ['jsx']);             // JSX files.
  gulp.watch(srcPath + 'css/**/*.scss', ['stylesheets']);   // SASS Main.
  gulp.watch(srcPath + 'css/**/_*.scss', ['stylesheets']);  // SASS Partials.
  gulp.watch(srcPath + '*.html', ['html']);                 // HTML
});

////////////////////////////////////////////////////////////////////////////////
// Default task
////////////////////////////////////////////////////////////////////////////////
gulp.task('default', ['watch', 'jsx', 'stylesheets', 'html','webserver']);

////////////////////////////////////////////////////////////////////////////////
// Build only task, no webserver or watch tasks.
////////////////////////////////////////////////////////////////////////////////
gulp.task('build', ['jsx', 'stylesheets', 'html']);
