const os = require('os')
const fs = require('fs')
const path = require('path')
const crypto = require('crypto')
const pkg = require('../package')

const homedir = os.homedir()

/**
 * Generator name
 * @type {String}
 */
exports.generator = `${pkg.name}/${pkg.version} (${pkg.homepage})`

/**
 * Current user home path
 * @type {String}
 */
exports.homedir = homedir

// /**
//  * Check path exists.
//  */
// exports.exists = input => {
//   return new Promise(resolve => fs.access(input, e => resolve(!e)))
// }

/**
 * Check path exists sync.
 */
exports.existsSync = input => {
  try {
    fs.accessSync(input)
    return true
  } catch (e) {
    return false
  }
}

/**
 * Check path locally
 */
exports.isLocalPath = input => {
  return /^[./]|^[a-zA-Z]:/.test(input)
}

/**
 * Get template path
 */
exports.getTemplatePath = input => {
  return path.resolve(process.cwd(), input)
}

/**
 * Get template url
 */
exports.getTemplateUrl = input => {
  if (/^https?:/.test(input)) return input

  return input.includes('/')
    ? `https://github.com/${input}/archive/master.zip`
    : `https://github.com/zce-templates/${input}/archive/master.zip`
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

// /**
//  * Eval
//  */
// exports.eval = (exp, data) => {
//   /* eslint-disable no-new-func */
//   try {
//     return new Function('data', `with (data) { return ${exp} }`)(data)
//   } catch (e) {
//     throw new Error(`Error when evaluating filter condition: ${exp}`)
//   }
// }
