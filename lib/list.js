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

module.exports = () => {
  spinner.start()

  return got('https://api.github.com/users/zce-templates/repos', options)
    .then(res => {
      spinner.stop()

      const data = JSON.parse(res.body)
      if (data.message) throw new Error(data.message)

      console.log('👇  Available official templates:')
      console.log()
      data.forEach(repo => console.log(`  ${chalk.yellow('→')} ${chalk.blue(repo.name)} - ${repo.description}`))
    })
    .catch(err => {
      spinner.stop()
      throw new Error(`Failed to load list from remote: ${err.message}`)
    })
}
