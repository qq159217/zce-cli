const chalk = require('chalk')

const timestamp = () => {
  const date = new Date()
  const h = ('0' + date.getHours()).substr(-2)
  const m = ('0' + date.getMinutes()).substr(-2)
  const s = ('0' + date.getSeconds()).substr(-2)
  return chalk.gray(`${h}:${m}:${s}`)
}

exports.log = (...args) => {
  process.stdout.write(`[${timestamp()}] `)
  console.log(...args)
}

exports.dir = (...args) => {
  process.stdout.write(`[${timestamp()}] `)
  console.dir(...args)
}

exports.info = (...args) => {
  process.stdout.write(`[${timestamp()}] `)
  console.info(...args)
}

exports.warn = (...args) => {
  process.stdout.write(`[${timestamp()}] `)
  console.warn(...args)
}

exports.error = (...args) => {
  process.stdout.write(`[${timestamp()}] `)
  console.error(...args)
}
