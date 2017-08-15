#!/usr/bin/env node

const list = require('../lib/list')

list().catch(err => {
  console.error(`\n😞  ${err.message}\n`)
  process.exit()
})
