// Requiring packages
var gulp = require('gulp');

var uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    watch = require("gulp-watch"),
    browserSync = require("browser-sync").create();

//Gulp Script Tasks
    gulp.task("scripts", function() {
        gulp.src("*.js") //Change this if I move js files into a JS folder
        .pipe(uglify()) //Call the uglify function
        .pipe(rename( {extname: ".min.js"} ))
        .pipe(gulp.dest("./build.js"))
    });

    gulp.task("sayHello", function() {
        console.log("hello!");
    })

    gulp.task("browser-sync", function(){
        browserSync.init({
            server: {
                baseDir: "./"
            }
        });
        gulp.watch(["build/*.js", "index.html"]).on("change", browserSync.reload); //These are the files I'm watching
    });


    //Gulp Watch Function
    gulp.task("watch", function() {
        gulp.watch('*.js', ["scripts"]);
    }); // Change this into pipe later 

    gulp.task('default', ["sayHello", "scripts", "watch", "browser-sync"]);
