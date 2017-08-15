const os = require('os')
const fs = require('fs')
const path = require('path')
const crypto = require('crypto')
const pkg = require('../package')

exports.generator = `${pkg.name}/${pkg.version} (${pkg.homepage})`

const homedir = exports.homedir = os.homedir()

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

/**
 * Tildify input path
 */
exports.tildify = input => {
  input = path.normalize(input)
  return input.includes(homedir) ? input.replace(homedir, '~') : input
}

/**
 * Untildify input path
 */
exports.untildify = input => {
  input = path.normalize(input)
  return input.includes('~') ? input.replace('~', homedir) : input
}

/**
 * MD5
 */
exports.md5 = input => {
  const temp = crypto.createHash('md5')
  temp.update(input)
  return temp.digest('hex')
}
