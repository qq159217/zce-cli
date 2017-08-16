const path = require('path')
const ora = require('ora')
const chalk = require('chalk')
const rimraf = require('rimraf')
const download = require('download')
const util = require('./util')

const options = {
  extract: true,
  strip: 1,
  mode: '666',
  headers: {
    'accept': 'application/zip',
    'user-agent': util.generator
  }
}

const spinner = ora('Downloading template...')

/**
 * Fetch template from remote or cache
 * @param  {String}  template Template name
 * @param  {Boolean} offline  Offline mode
 * @return {Promise}          Fetch promise
 */
module.exports = (template, offline) => {
  // TODO: template id
  // cache hash
  const cachePath = path.join(util.homedir, '.zce-templates', util.md5(template))
  const cacheExists = util.existsSync(cachePath)

  if (offline && cacheExists) {
    console.log(`\n🚆  Use cached template @ ${chalk.yellow(util.tildify(cachePath))}`)
    return Promise.resolve(cachePath)
  } else if (offline) {
    console.log(`\n🤠  Template cache ${chalk.yellow(util.tildify(cachePath))} not found`)
  }

  console.log()
  spinner.start()
  cacheExists && rimraf.sync(cachePath)

  return download(util.getTemplateUrl(template), cachePath, options)
    .then(() => {
      spinner.succeed('Download complete.')
      return cachePath
    })
    .catch(err => {
      spinner.fail('Download failed.')
      throw new Error(`Failed to fetch template "${template}": ${err.message}`)
    })
}
