const gulp = require("gulp");
const babel = require("gulp-babel");
const watch = require("gulp-watch");
const rollup = require("gulp-rollup");
const replace = require("rollup-plugin-replace");
const eslint = require("gulp-eslint");
const entry = "./src/server/**/*.js";
//开发环境
function builddev() {
        return watch(entry, {
                ignoreInitial: false
        }, function () {
                gulp.src(entry)
                        .pipe(babel({
                                babelrc: false,//很重要，让外面的babel不生效，里面的这个生效
                                "plugins": [
                                        ['transform-es2015-modules-commonjs']
                                ]
                        }))
                        .pipe(gulp.dest("dist"));
        });
}

//上线环境
function buildprod() {
        return gulp.src(entry)
                .pipe(babel({
                        babelrc: false,//很重要，让外面的babel不生效，里面的这个生效
                        ignore: ["./src/server/config/*.js"],
                        "plugins": [
                                ['@babel/plugin-proposal-decorators', {
                                        "legacy": true
                                }],
                                [
                                'transform-es2015-modules-commonjs'
                                ]
                        ]
                }))
                .pipe(gulp.dest("dist"));
}

//对代码进行检查的环境
function buildlint() {
        return gulp.src(entry)
                .pipe(eslint())
                .pipe(eslint.format())
                .pipe(eslint.failAfterError());
}

//清洗环境
function buildconfig() {
        return gulp.src(entry)
                // transform the files here.
                .pipe(rollup({
                        output: {
                                format: 'cjs'
                        },
                        // any option supported by Rollup can be set here.
                        input: './src/server/config/index.js',
                        plugins: [
                                replace({
                                        "process.env.NODE_ENV": JSON.stringify('production')
                                })
                        ]
                }))
                .pipe(gulp.dest('./dist'));
}

let build = gulp.series(builddev);
if (process.env.NODE_ENV == "production") {
        build = gulp.series(buildprod, buildconfig);
}

if (process.env.NODE_ENV == "lint") {
        build = gulp.series(buildlint);
}
gulp.task("default", build);//编译babel