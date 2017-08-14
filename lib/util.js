/**
 * Utils
 */
const fs = require('fs')
const path = require('path')
const pkg = require('../package')

exports.generator = `${pkg.name}/${pkg.version} (${pkg.homepage})`

/**
 * Check path exists.
 */
exports.pathExists = name => {
  return new Promise(resolve => fs.access(name, err => resolve(!err)))
}

/**
 * Check path locally
 */
exports.pathLocally = name => /^[./]|^[a-zA-Z]:/.test(name)

/**
 * Get template path
 */
exports.getTemplatePath = name => path.resolve(process.cwd(), name)

/**
 * Get template url
 */
exports.getTemplateUrl = name => {
  if (/^https?:/.test(name)) return name

  return name.includes('/')
    ? `https://github.com/${name}/archive/master.zip`
    : `https://github.com/zce-templates/${name}/archive/master.zip`
}
