const path = require('path')
const fs = require('fs-extra')
const _ = require('lodash')
const postcss = require('postcss')
const autoprefixer = require('autoprefixer')
const sass = require('node-sass')
const pug = require('pug')

var cleaner  = postcss([ autoprefixer({ add: true, browsers: [] }) ])
var prefixer = postcss([ autoprefixer ])

const src = path.resolve(__dirname, '..', 'src')
const srcPug = path.join(src, 'index.pug')

const www = path.resolve(__dirname, '..', 'www')
const wwwCss = path.join(www, 'index.css')
const wwwHtml = path.join(www, 'index.html')

function renderSass(dest, options) {
  return new Promise((resolve, reject) => {
    sass.render(options, (err, result) => {
      if(err) return reject(err)
      cleaner.process(result.css)
        .then(cleaned => prefixer.process(cleaned.css))
        .then(prefixed => fs.outputFile(dest, prefixed.css))
        .then(() => resolve())
        .catch(err => reject(err))
    })
  })
}

function renderPug(src, dest, options) {
  return new Promise((resolve, reject) => {
    let html
    try {
      html = pug.renderFile(src, options)
    } catch(e) {
      return reject(e)
    }
    fs.outputFile(dest, html)
      .then(() => resolve())
      .catch(err => reject(err))
  })
}

renderSass(wwwCss, {
  file: path.join(src, 'index.sass'),
  indentedSyntax: true,
  includePaths: [],
  outputStyle: "expanded"
})
.then(() => renderPug(srcPug, wwwHtml, {  }))
.then(() => fs.copy(path.join(src, 'index.js'), path.join(www, 'index.js')))
.then(() => fs.copy(path.join(src, 'groups.js'), path.join(www, 'groups.js')))
.then(() => fs.copy(path.join(src, 'fonts'), path.join(www, 'fonts')))
.then(() => {
  console.log('Success')
})
.catch(err => {
  console.log(err)
})
