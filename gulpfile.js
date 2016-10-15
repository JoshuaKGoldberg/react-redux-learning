const gulp = require("gulp");
const gulpTslint = require("gulp-tslint");
const merge = require("merge2");
const sourcemaps = require("gulp-sourcemaps");
const tslint = require("tslint");
const typescript = require("gulp-typescript");

const program = tslint.createProgram("./tsconfig.json");
const project = typescript.createProject("./tsconfig.json");

gulp.task("default", ["tslint", "typescript"]);

gulp.task("tslint", () => {
    return gulp.src("**/*.ts")
        .pipe(gulpTslint({
            configuration: "./tslint.json",
            program,
            tslint: tslint
        }))
        .pipe(gulpTslint.report());
});

gulp.task("typescript", function() {
    var tsResult = gulp.src("src/**/*.ts")
        .pipe(sourcemaps.init())
        .pipe(project());
 
    return merge([
        tsResult.dts.pipe(gulp.dest("lib")),
        tsResult.js
            .pipe(sourcemaps.write())
            .pipe(gulp.dest("lib"))
    ]);
});

gulp.task("watch", ["default"], function() {
    gulp.watch("src/*/**.ts", ["default"]);
});
