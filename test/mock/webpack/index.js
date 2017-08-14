module.exports = {
  prompts: {
    name: {
      type: 'input',
      message: 'Project name'
    },
    description: {
      type: 'input',
      message: 'Project description',
      default: 'A webpack project'
    },
    author: {
      type: 'input',
      message: "Project author"
    },
    version: {
      type: 'input',
      message: "Project version"
    },
    license: {
      type: 'input',
      message: "Project license"
    },
    repository: {
      type: 'input',
      message: "Project repository"
    },
    sass: {
      type: 'confirm',
      message: 'Use sass preprocessor?',
      default: true
    }
  },
  filters: {
    '_sass/**': e => e.sass
  },
  helpers: {
    uppercase: str => str.toUpperCase(),
    lowercase: str => str.toLowerCase()
  },
  complete: e => {
    console.log('Good luck')
  }
}
