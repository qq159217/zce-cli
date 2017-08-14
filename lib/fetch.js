const os = require('os')
const path = require('path')
const ora = require('ora')
const slug = require('slug')
const chalk = require('chalk')
const rimraf = require('rimraf')
const download = require('download')
const util = require('./util')
const logger = require('./logger')

const spinner = ora('Downloading template...')

const options = {
  extract: true,
  strip: 1,
  mode: '666',
  headers: {
    'accept': 'application/zip',
    'user-agent': util.generator
  }
}

module.exports = (template, offline) => {
  const url = util.getTemplateUrl(template)
  const filename = path.join('.zce-templates', slug(template))
  const dest = path.join(os.homedir(), filename)

  return util.pathExists(dest)
    .then(exists => {
      if (offline && exists) {
        logger.log(`Use cached template @ ${chalk.yellow(path.join('~', filename))}`)
        return dest
      }

      spinner.start()
      exists && rimraf.sync(dest)

      return download(url, dest, options)
        .then(() => {
          spinner.stop()
          return dest
        })
        .catch(err => {
          spinner.stop()
          logger.error(`Failed to fetch template ${template}: ${err.message}`)
          process.exit()
        })
    })
}
