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

module.exports = context => {
  const { template, offline } = context

  // cache hash
  const hash = util.md5(template)
  const cache = path.join(util.homedir, '.zce-templates', hash)
  const cacheExists = util.pathExists(cache)

  if (offline && cacheExists) {
    console.log(`\n🚆  Use cached template @ ${chalk.yellow(util.tildify(cache))}`)
    return Promise.resolve(cache)
  } else if (offline) {
    console.log(`\n🤠  Template cache ${chalk.yellow(util.tildify(cache))} not found`)
  }

  console.log()
  spinner.start()
  cacheExists && rimraf.sync(cache)

  return download(util.getTemplateUrl(template), cache, options)
    .then(() => {
      spinner.succeed('Download complete.')
      return cache
    })
    .catch(err => {
      spinner.fail('Download failed.')
      throw new Error(`Failed to fetch template "${template}": ${err.message}`)
    })
}
