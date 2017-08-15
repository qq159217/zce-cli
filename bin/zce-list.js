#!/usr/bin/env node

const util = require('../lib/util')
const list = require('../lib/list')

util.padding()

list().catch(err => {
  console.error(`\n😞  ${err.message}`)
  process.exit()
})
