module.exports = {
  prompts: {
    name: {
      type: 'input',
      message: 'Project name'
    },
    hello: {
      type: 'confirm',
      message: 'Say hello?',
      default: true
    }
  }
}
