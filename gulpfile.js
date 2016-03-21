// Include Our Plugins
var gulp = require('gulp');

var uglify = require('gulp-uglify');
var htmlreplace = require('gulp-html-replace');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var watchify = require('watchify');
var reactify = require('reactify');
var streamify = require('gulp-streamify');
var sass = require('gulp-sass');
var eslint = require('gulp-eslint');
var react = require('gulp-react');


var path = {
    HTML: './index.html',
    MINIFIED_OUT: 'build.min.js',
    OUT: 'build.js',
    DEST: 'dist',
    DEST_SRC: 'dist/scripts',
    DEST_BUILD: 'dist/build',
    ENTRY_POINT: './scripts/app.jsx'

};

gulp.task('copy', function(){
  gulp.src(path.HTML)
    .pipe(gulp.dest(path.DEST));
});

gulp.task('watch', function() {

  gulp.watch(['./scripts/**/*.js', './scripts/**/*.jsx'], ['lint']);
  gulp.watch('./styles/*.scss', ['sass']);
  gulp.watch(path.HTML, ['copy']);

  var watcher  = watchify(browserify({
    entries: [path.ENTRY_POINT],
    transform: [reactify],
    debug: true,
    cache: {}, packageCache: {}, fullPaths: true
  }));

  return watcher.on('update', function () {
    watcher.bundle()
      .pipe(source(path.OUT))
      .pipe(gulp.dest(path.DEST_SRC))
      console.log('Updated');
  })
    .bundle()
    .pipe(source(path.OUT))
    .pipe(gulp.dest(path.DEST_SRC));
});


// Lint Task
gulp.task('lint', function () {
    // ESLint ignores files with "node_modules" paths.
    // So, it's best to have gulp ignore the directory as well.
    // Also, Be sure to return the stream from the task;
    // Otherwise, the task may end before the stream has finished.
    return gulp.src(['./scripts/**/*.js', './scripts/**/*.jsx'])
        // eslint() attaches the lint output to the "eslint" property
        // of the file object so it can be used by other modules.
        .pipe(eslint({
        extends: ['eslint:recommended', "plugin:react/recommended"],
        plugins: ["react"],
        parserOptions: {
          "ecmaVersion": 6,
          "sourceType": "module"
          },
        ecmaFeatures: {
            'modules': true,
          },
        parserOptions: {
            "ecmaFeatures": {
                "jsx": true
                }
          },

        rules: {
            'no-undef': 1,
            'react/no-danger': 1,
            'strict': 0,
            'no-console': 0,
            'no-unused-vars': 1,
            'react/prop-types': 1,
          },
        globals: {
            'jQuery':true,
            '$':true,
            'React': true,
            'ReactDOM': true
         },
        env: {
        "browser": true
          }

    }))
        // eslint.format() outputs the lint results to the console.
        // Alternatively use eslint.formatEach() (see Docs).
        .pipe(eslint.format())
        // To have the process exit with an error code (1) on
        // lint error, return the stream and pipe to failAfterError last.
        .pipe(eslint.failAfterError());
});


gulp.task('sass', function() {
    return gulp.src('./styles/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('dist/styles'));
});

gulp.task('build', function(){
  browserify({
    entries: [path.ENTRY_POINT],
    transform: [reactify]
  })
    .bundle()
    .pipe(source(path.MINIFIED_OUT))
    .pipe(streamify(uglify(path.MINIFIED_OUT)))
    .pipe(gulp.dest(path.DEST_BUILD));
});

gulp.task('replaceHTML', function(){
  gulp.src(path.HTML)
    .pipe(htmlreplace({
      'js': 'build/' + path.MINIFIED_OUT
    }))
    .pipe(gulp.dest(path.DEST));
});

gulp.task('production', ['replaceHTML', 'build']);

gulp.task('default', ['sass', 'lint', 'watch']);