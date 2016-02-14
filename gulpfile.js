/**
 * Created by ой on 02.02.2016.
 */
var source = require('vinyl-source-stream');
var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var less = require('gulp-less');

function build(){
    return browserify({
        entries:'public/js/app.jsx',
        extensions:['.jsx','.js'],
        debug:true
    })
        .transform(babelify,{presets:['es2015','react']})
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('public'))
        .on('finish', function () {
            console.log('finish')
        })
}

function styles(){
        gulp.src('public/styles/style.less')
            .pipe(less())
            .pipe(gulp.dest('public'))
}
gulp.task('build',build);
gulp.task('styles', styles);

gulp.task('watch', function () {
    gulp.watch(['public/js/**/*.jsx','public/js/**/*.js'],function(){
        console.log('updating...');
        build();
    });
});


gulp.task('watch_styles', function () {
    gulp.watch('public/styles/*.less', function () {
        console.log('styles updating');
        styles();
    })
})

gulp.task('default',['build','styles','watch','watch_styles']);