const path = require('path')
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

module.exports = (template, offline) => {
  const filename = path.join('~', '.zce-templates', util.md5(template))
  const dest = util.untildify(filename)

  return util.pathExists(dest)
    .then(exists => {
      if (offline && exists) {
        console.log(`\n🚆  Use cached template @ ${chalk.yellow(filename)}\n`)
        return dest
      }

      spinner.start()
      exists && rimraf.sync(dest)

      const url = util.getTemplateUrl(template)
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
