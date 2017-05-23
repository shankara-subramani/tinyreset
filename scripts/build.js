const fs       = require('fs');
const CleanCSS = require('clean-css');
const sass     = require('node-sass');

const pkg = JSON.parse(fs.readFileSync('./package.json'));
const name = pkg.name;

sass.render({
  file: `./${name}.scss`
}, (error, result) => {
  const cleanCSS = new CleanCSS();
  const css      = result.css;
  const minified = cleanCSS.minify(css).styles;

  fs.writeFile(`./${name}.css`, css, error => {
    if (error) {
      return error;
    }
  });

  fs.writeFile(`./${name}.min.css`, minified, error => {
    if (error) {
      return error;
    }
  });
});
