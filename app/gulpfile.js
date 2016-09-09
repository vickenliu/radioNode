// Include Gulp
var gulp = require('gulp');

// Include plugins
var plugins = require("gulp-load-plugins")({
	pattern: ['gulp-*', 'gulp.*', 'main-bower-files'],
	replaceString: /\bgulp[\-.]/
});

// Define default destination folder
var dest = '../public/';


/** tasks **/

gulp.task('js', function() {

	var jsFiles = ['src/js/**/*.js','src/*.js'];

	  gulp.src(plugins.mainBowerFiles())
    .pipe(plugins.filter('**/*.js'))
		.pipe(plugins.concat('vendor.js'))
		.pipe(gulp.dest(dest + 'js/'));

		gulp.src(jsFiles)
		.pipe(plugins.order([
						'ng_app.js',
						'*'
					]))
		.pipe(plugins.concat('main.js'))
    .pipe(plugins.babel({
            presets: ['es2015']
        }))
		.pipe(gulp.dest(dest + 'js/'));
});

gulp.task('css', function() {
  var cssFiles = ['src/scss/*.scss']

      gulp.src(plugins.mainBowerFiles().concat(cssFiles))
  		.pipe(plugins.filter('**/*.*css'))
      .pipe(plugins.order([
              'normalize.css',
              '*'
            ]))
      .pipe(plugins.sass())
  		.pipe(plugins.concat('main.css'))
      .pipe(plugins.autoprefixer({
                browsers: ['last 2 versions'],
                cascade: false
            }))
  		.pipe(gulp.dest(dest + 'css/'));

});

gulp.task('watch',function(){
  gulp.watch('src/scss/*.scss',['css'])
  gulp.watch('src/js/**/*.js',['js'])
	gulp.watch('src/*.js',['js'])
})

gulp.task('default', ['css','js'])
