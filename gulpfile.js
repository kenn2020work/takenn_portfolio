const gulp = require('gulp'); //gulp本体 v 4.0.2
const browserSync = require('browser-sync').create() //画面をリロード
const sass = require("gulp-sass"); // Sassをコンパイルするプラグインの読み込み
const packageImporter = require('node-sass-package-importer'); //scssでcssファイルを読み込み
const sassGlob = require( 'gulp-sass-glob' ); //sassをパーシャル化
const plumber = require( 'gulp-plumber' ); //error時に止めずに実行し続ける
const notify = require( 'gulp-notify' ); //error通知を出す

const cleanCSS = require('gulp-clean-css'); //cssファイル圧縮
const rename = require('gulp-rename'); //ファイル名リネーム(圧縮した css のファイル名に.minを追加)
const imagemin = require("gulp-imagemin"); //画像圧縮

const webpack = require("webpack");  //webpack本体 v 4.41.6
const webpackStream = require("webpack-stream"); //webpackをgulpで使用する為のプラグイン


//  browser 初期パス指定
gulp.task('serve', function (done) {
  browserSync.init({
    server: {
      baseDir: './',
      index: 'index.html',
    },
  })
  done();
})
//  browserリロード更新 タスク
gulp.task('bs-reload', function (done) {
  browserSync.reload();
  done();
})

//path 作成(sassコンパイル用)
const paths = {
  'src': {
    'scss': './src/style.scss',
  },
  'dist': {
    'css': './dist/css/',
    'js': './dist/js/',
  }
};
// sassコンパイタスク
gulp.task('sass', done => {
  gulp.src(paths.src.scss)
  .pipe(plumber({ errorHandler: notify.onError('Error: &lt;%= error.message %&gt;') }))//watch中にエラーが起きても止まらない
  .pipe(sassGlob()) //importの読み込みを簡潔にする
  .pipe(sass({
    importer: packageImporter({
      extensions: ['.scss', '.css'] //scssファイルでcssの読み込みOK
    })
  }))
    .pipe(sass({
      outputStyle: 'expanded',
    })
    .on('error', sass.logError))
    .pipe(gulp.dest(paths.dist.css))
    .pipe(cleanCSS())
    .pipe(rename({
      suffix: '.min',
     }))
    .pipe(gulp.dest(paths.dist.css));
    done();
});


//JS bundle化 webpackタスク
const webpackConfig = require("./webpack.config"); // webpackの設定ファイルの読み込み
gulp.task("bundle.js", () => { // タスクの定義。 ()=> の部分はfunction() でも可
  return webpackStream(webpackConfig, webpack)   // ☆ webpackStreamの第2引数にwebpackを渡す☆
    .pipe(gulp.dest(paths.dist.js));
});

// img 画像圧縮
gulp.task("imagemin", () =>
  gulp.src("./src/img/**")  // 画像のマッチパターン
      .pipe(imagemin())  // 画像の最適化処理
      .pipe(gulp.dest("./dist/img"))  // 最適化済みの画像を書き出すフォルダー
);

//ファイル変更時に行うタスク
gulp.task('watch', function (done) {
  gulp.watch('./*.html', gulp.task('bs-reload'));
  gulp.watch('./src/**/*.scss', gulp.task('sass'));
  gulp.watch('./src/**/*.scss', gulp.task('bs-reload')); //bundle後に画面更新
  gulp.watch('./src/**/*.js', gulp.task('bs-reload')); //bundle後に画面更新
  gulp.watch('./src/**/*.js', gulp.task('bundle.js')); 
})

//npx gulpと打ち込んだ時に行う処理
// gulp.task('default', gulp.series(gulp.parallel('serve','watch')));
gulp.task('default', gulp.series(gulp.parallel('serve','sass','bundle.js','watch')));
// gulp.task('default', gulp.series(gulp.parallel('serve','sass','bundle.js','watch','imagemin')));
