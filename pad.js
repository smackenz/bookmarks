const _ = require('lodash')

function printKeys(obj) {
  let keys = _.keys(obj)
  return console.log('npm i --save-dev ' + keys.join(' '))
}

printKeys({
  "gulp": "^3.9.1",
  "gulp-autoprefixer": "^4.1.0",
  "gulp-babel": "^7.0.1",
  "gulp-clean-css": "^3.9.2",
  "gulp-concat": "^2.6.1",
  "gulp-file-include": "^2.0.1",
  "gulp-imagemin": "^4.1.0",
  "gulp-plumber": "^1.2.0",
  "gulp-rename": "^1.2.2",
  "gulp-requirejs": "^1.1.1",
  "gulp-requirejs-optimize": "^1.2.0",
  "gulp-rev": "^8.1.1",
  "gulp-sass": "^3.1.0",
  "gulp-sourcemaps": "^2.6.4"
});
