module.exports = {
  prompts: {
    name: {
      type: 'input',
      message: 'Project name'
    },
    description: {
      type: 'input',
      message: 'Project description',
      default: 'A jekyll project'
    },
    author: {
      type: 'input',
      message: "Project author"
    },
    sass: {
      type: 'confirm',
      message: 'Use sass preprocessor?',
      default: true
    }
  },
  filters: {
    '_sass/**': 'sass'
  },
  helpers: {
    uppercase: str => str.toUpperCase(),
    lowercase: str => str.toLowerCase()
  },
  plugins: {
    before: (app, opts, helpers) => {
      console.log('plugin before')
    },
    after: (app, opts, helpers) => {
      console.log('plugin after')
    }
  },
  complate: e => {
    console.log('Good luck', e)
  }
}
