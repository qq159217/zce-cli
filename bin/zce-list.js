#!/usr/bin/env node

const program = require('commander')
const list = require('../lib/list')

program
  .option('-s, --short', 'short mode')
  .option('--debug', 'debug mode')
  .on('--help', console.log)
  .parse(process.argv)

const { short, debug } = program

list(short, debug)
