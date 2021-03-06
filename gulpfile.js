var gulp        = require('gulp');
var browserSync = require('browser-sync');
var sass        = require('gulp-sass');
var prefix      = require('gulp-autoprefixer');
var cp          = require('child_process');
var jade        = require('gulp-jade');
var sourcemaps  = require('gulp-sourcemaps');
var uglify      = require('gulp-uglify');
var pump        = require('pump');
var imagemin    = require('gulp-imagemin');
var critical    = require('critical');

var jekyll   = process.platform === 'win32' ? 'jekyll.bat' : 'jekyll';
var messages = {
    jekyllBuild: '<span style="color: grey">Running:</span> $ jekyll build'
};

/**
 * Build the Jekyll Site
 */
gulp.task('jekyll-build', function (done) {
    browserSync.notify(messages.jekyllBuild);
    return cp.spawn( jekyll , ['build'], {stdio: 'inherit'})
        .on('close', done);
});

/**
 * Rebuild Jekyll & do page reload
 */
gulp.task('jekyll-rebuild', ['jekyll-build'], function () {
    browserSync.reload();
});

/**
 * Wait for jekyll-build, then launch the Server
 */
gulp.task('browser-sync', ['sass', 'jekyll-build'], function() {
    browserSync({
        server: {
            baseDir: '_site'
        }
    });
});

/**
 * Compile files from _scss into both _site/css (for live injecting) and site (for future jekyll builds)
    + Added Sass Sourcemaps
 */
gulp.task('sass', function () {
    return gulp.src('assets/css/main.scss')
        // .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'compressed', /* minify CSS */
            includePaths: ['css'],
            onError: browserSync.notify
        }))
        .pipe(prefix(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
        .pipe(gulp.dest('_site/assets/css'))
        .pipe(browserSync.reload({stream:true}))
        // .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('assets/css'));
});

/**
 * Minify JS
 */
 gulp.task('compress', function (cb) {
   pump([
         gulp.src('assets/js/uncompress/*.js'),
         uglify(),
         gulp.dest('assets/js/compress')
     ],
     cb
   );
 });




/**
* Compile Jade files from _jadefiles into _includes (HTML)
*/
gulp.task('jade', function(){
   return gulp.src('_jadefiles/*.jade')
    .pipe(jade())
    .pipe(gulp.dest('_includes'));
});

// Optimizes and copies image files.
gulp.task('imagemin', function(){
	gulp.src('assets/img/**/*')
		.pipe(imagemin())
		.pipe(gulp.dest('assets/img'))
});


// -----------------------------------------------------------------------------
// Generate critical-path CSS
//
// This task generates a small, minimal amount of your CSS based on which rules
// are visible (aka "above the fold") during a page load. We will use a Jekyll
// template command to inline the CSS when the site is generated.
//
// All styles should be directly applying to an element visible when your
// website renders. If the user has to scroll even a small amount, it's not
// critical CSS.
// -----------------------------------------------------------------------------
gulp.task('critical', function (cb) {
  critical.generate({
    base: '_site/',
    src: 'index.html',
    css: ['assets/css/main.css'],
    dimensions: [{
      width: 320,
      height: 480
    },{
      width: 768,
      height: 1024
    },{
      width: 1280,
      height: 960
    }],
    dest: '../_includes/critical.css',
    minify: true,
    extract: false
  });
});

/**
 * Watch scss files for changes & recompile
 * Watch html/md files, run jekyll & reload BrowserSync
 */
gulp.task('watch', function () {
    gulp.watch('assets/css/**', ['sass']);
    gulp.watch(['*.html', '_layouts/*.html', '_includes/*', 'assets/js/compress/*'], ['jekyll-rebuild']);
    gulp.watch('_jadefiles/*.jade', ['jade']);
    gulp.watch('assets/js/uncompress/**', ['compress']);
    gulp.watch('assets/img/**/*', ['imagemin']);
});

/**
 * Default task, running just `gulp` will compile the sass,
 * compile the jekyll site, launch BrowserSync & watch files.
 */
gulp.task('default', ['browser-sync', 'watch']);
