// Include gulp
var gulp = require('gulp');

// Include Our Plugins
var sass = require('gulp-sass');
var eslint = require('gulp-eslint');

// Lint Task

// Lint Task
gulp.task('lint', function () {
    // ESLint ignores files with "node_modules" paths.
    // So, it's best to have gulp ignore the directory as well.
    // Also, Be sure to return the stream from the task;
    // Otherwise, the task may end before the stream has finished.
    return gulp.src('./scripts/**/*.js')
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


// Compile Our Sass
gulp.task('sass', function() {
    return gulp.src('./styles/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./styles/'));
});

// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch('./scripts/**/*.js', ['lint']);
    gulp.watch('./styles/*.scss', ['sass']);
});

// Default Task
gulp.task('default', ['lint', 'sass', 'watch'])