#!/usr/bin/env node

const { gray } = require('chalk')
const program = require('commander')

program
  .usage('<template> [project]')
  // .option('-c, --clone', 'use git clone')
  .on('--help', () => {
    console.log()
    console.log('  Examples:')
    console.log()
    console.log(gray('    # create a new project with an official template'))
    console.log('    $ zce init webpack my-project')
    console.log()
    console.log(gray('    # create a new project straight from a github template'))
    console.log('    $ zce init <username>/<repo> my-project')
    console.log()
  })
  .parse(process.argv)

if (!program.args.length) {
  program.help() && process.exit()
}
