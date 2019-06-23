let { dest, src } = require("gulp");
let concat = require("gulp-concat");
let postcss = require("gulp-postcss");
let scss = require("postcss-scss");
let del = require("del");

let postCssPlugins = [
  require("postcss-import")(),
  require("postcss-strip-inline-comments"),
  require("postcss-preset-env")(), // css future
  require("postcss-simple-vars")(), // sass-like variables
  require("autoprefixer")(),
  require("cssnano")()
];

async function build() {
  del.sync(["dist/*", "!dist"]);
  src("src/theme.light.css")
    .pipe(concat("fox.light.min.css"))
    .pipe(postcss(postCssPlugins, { syntax: scss }))
    .pipe(dest("dist"));

  src("src/theme.dark.css")
  .pipe(concat("fox.dark.min.css"))
  .pipe(postcss(postCssPlugins, { syntax: scss }))
  .pipe(dest("dist"));
}

module.exports = {
  build
};
