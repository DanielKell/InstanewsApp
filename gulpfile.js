// Requiring packages
const gulp = require('gulp');

const uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    watch = require("gulp-watch"),
    browserSync = require("browser-sync").create(),
    eslint = require('gulp-eslint'),
    autoprefixer = require('gulp-autoprefixer'),
    cssnano = require('gulp-cssnano'),
    sass = require('gulp-sass'),
    prettyError = require('gulp-prettyerror'),
    babel = require('gulp-babel');

//Gulp Babel


//Gulp Script Tasks
    gulp.task("scripts", ['lint'], function() {
        gulp.src("./js/*.js") 
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(uglify()) //Call the uglify function
        .pipe(rename( {extname: ".min.js"} ))
        .pipe(gulp.dest("./build/js"))
    });

    // BrowserSync
    gulp.task("browser-sync", function(){
        browserSync.init({
            server: {
                baseDir: "./"
            }
        });
        gulp.watch(["./build/js/*.js", "index.html"]).on("change", browserSync.reload); //These are the files I'm watching
    });

    //Sass etc on the source file. Output pretty errors, process sass, 
    gulp.task('sass', function() {
         gulp.src('./sass/style.scss')
            .pipe(prettyError())
            .pipe(sass())
            .pipe(autoprefixer({
                browsers: ['last 2 versions']
            }))
            .pipe(gulp.dest('./build/css'))
            .pipe(cssnano())
            .pipe(rename('style.min.css'))
            .pipe(gulp.dest('./build/css'));
    });

    //Lint Function
    gulp.task('lint', () => {
    return gulp.src(['./js/*.js'])
        // eslint() attaches the lint output to the "eslint" property 
        // of the file object so it can be used by other modules. 
        .pipe(eslint())
        // eslint.format() outputs the lint results to the console. 
        // Alternatively use eslint.formatEach() (see Docs). 
        .pipe(eslint.format())
    });

    //Gulp Watch Function
    gulp.task("watch", function() { //Need to be watching at all times in the console log for this to be working. Run "Gulp" in cmd
        gulp.watch('./js/*.js', ["scripts"]);
        gulp.watch('sass/*', ['sass'])
    }); // Change this into pipe later 

    //Run all the gulp tasks when you "Gulp" in cmd
    gulp.task('default', ["scripts", "watch", "browser-sync", 'sass']);