#!/usr/bin/env node

const path = require('path')
const program = require('commander')
const inquirer = require('inquirer')
const { gray } = require('chalk')
const pathExists = require('path-exists')

program
  .usage('<template> [project]')
  .on('--help', () => {
    console.log()
    console.log('  Examples:')
    console.log()
    console.log(gray('    # create a new project with an official template'))
    console.log('    $ zce init nm my-project')
    console.log()
    console.log(gray('    # create a new project straight from a github template'))
    console.log('    $ zce init <username>/<repo> my-project')
    console.log()
  })
  .parse(process.argv)
  .args.length || program.help()

const [ template, project ] = program.args
const target = path.resolve(project || '.')
const name = path.basename(target)

pathExists(target)
  .then(exists => exists
    ? inquirer.prompt({
      name: 'ok',
      type: 'confirm',
      message: target === process.cwd()
        ? 'Generate project in current directory?'
        : 'Target directory exists. Continue?'
    })
    : Promise.resolve({ ok: true }))
  .then(answer => {
    if (!answer.ok) return false
    return true
  })
