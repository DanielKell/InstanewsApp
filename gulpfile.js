// Requiring packages
var gulp = require('gulp');

var uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    watch = require("gulp-watch"),
    browserSync = require("browser-sync").create(),
    eslint = require('gulp-eslint');

//Gulp Script Tasks
    gulp.task("scripts", function() {
        gulp.src("./js/*.js") //Change this if I move js files into a JS folder
        .pipe(uglify()) //Call the uglify function
        .pipe(rename( {extname: ".min.js"} ))
        .pipe(gulp.dest("./build/js"))
    });

    gulp.task("sayHello", function() {
        console.log("hello!");
    });

    gulp.task("browser-sync", function(){
        browserSync.init({
            server: {
                baseDir: "./"
            }
        });
        gulp.watch(["./build/*.js", "index.html"]).on("change", browserSync.reload); //These are the files I'm watching
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
    }); // Change this into pipe later 

    //Run all the gulp tasks when you "Gulp" in cmd
    gulp.task('default', ["sayHello", "scripts", "watch", "browser-sync", "lint"]);


 