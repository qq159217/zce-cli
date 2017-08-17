const ora = require('ora')
const got = require('got')
const chalk = require('chalk')
const util = require('./util')

const spinner = ora('Loading available list from remote...')

const options = {
  headers: {
    'accept': 'application/json',
    'user-agent': util.generator
  }
}

/**
 * List command
 * @param  {Boolean} short Short mode
 * @param  {Boolean} debug Debug mode
 * @return {Promise}       List promise
 */
module.exports = (short, debug) => {
  console.log()
  spinner.start()
  let api = 'https://api.github.com/users/zce-templates/repos'

  /* istanbul ignore else */
  if (process.env.NODE_ENV === 'testing') {
    api = process.env.TEST_API || api
    if (process.env.GITHUB_PAT) {
      options.headers.authorization = 'token ' + process.env.GITHUB_PAT
    }
  }

  return got(api, options)
    .then(res => {
      spinner.stop()

      const data = JSON.parse(res.body)
      /* istanbul ignore if */
      // TODO: When will this happen?
      if (data.message) throw new Error(data.message)

      if (!data.length) {
        console.log('Not found available\n')
        return data
      }

      if (short) {
        data.forEach(repo => console.log(chalk.blue(repo.name)))
      } else {
        console.log('👇  Available official templates:')
        console.log()
        data.forEach(repo => console.log(`  ${chalk.yellow('→')} ${chalk.blue(repo.name)} - ${repo.description}`))
      }

      console.log()
      return data
    })
    .catch(err => {
      spinner.stop()

      console.error(`😞  Failed to load list from remote: ${err.message}`)

      debug && console.error('\n', err)

      console.log()

      /* istanbul ignore else */
      if (process.env.NODE_ENV === 'testing') {
        throw err
      } else {
        process.exit()
      }
    })
}
