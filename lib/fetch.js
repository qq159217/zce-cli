const os = require('os')
const path = require('path')
const crypto = require('crypto')
const ora = require('ora')
const chalk = require('chalk')
const rimraf = require('rimraf')
const download = require('download')
const util = require('./util')

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

const md5 = input => {
  const temp = crypto.createHash('md5')
  temp.update(input)
  return temp.digest('hex')
}

module.exports = (template, offline) => {
  const url = util.getTemplateUrl(template)
  const filename = path.join('.zce-templates', md5(template))
  const dest = path.join(os.homedir(), filename)

  return util.pathExists(dest)
    .then(exists => {
      if (offline && exists) {
        console.log(`\n🚆  Use cached template @ ${chalk.yellow(path.join('~', filename))}\n`)
        return dest
      }

      spinner.start()
      exists && rimraf.sync(dest)

      return download(url, dest, options)
        .then(() => {
          spinner.succeed('Download complete.')
          return dest
        })
        .catch(err => {
          spinner.fail('Download failed.')
          throw new Error(`Failed to fetch template "${template}": ${err.message}`)
        })
    })
}
