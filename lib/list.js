const ora = require('ora')
const got = require('got')
const chalk = require('chalk')
const util = require('./util')

const spinner = ora('Loading available list from remote...')

const gotOptions = {
  headers: {
    'accept': 'application/json',
    'user-agent': util.generator
  }
}

module.exports = options => {
  // defaults
  options = Object.assign({ short: false, debug: false }, options)

  console.log()
  spinner.start()

  return got('https://api.github.com/users/zce-templates/repos', gotOptions)
    .then(res => {
      spinner.stop()

      const data = JSON.parse(res.body)
      if (data.message) throw new Error(data.message)

      if (options.short) {
        // short mode
        data.forEach(repo => console.log(chalk.blue(repo.name)))
      } else {
        console.log('👇  Available official templates:')
        console.log()
        data.forEach(repo => console.log(`  ${chalk.yellow('→')} ${chalk.blue(repo.name)} - ${repo.description}`))
      }

      console.log()
    })
    .catch(err => {
      spinner.stop()

      console.error(`😞  Failed to load list from remote: ${err.message}`)

      options.debug && console.error('\n', err)

      console.log()
      process.exit()
    })
}
