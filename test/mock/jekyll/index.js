module.exports = {
  name: 'jekyll',
  version: '0.1.0',
  template: 'template',
  metadata: {
    title: 'jekyll-boilerplate'
  },
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
    '_sass/**': a => a.sass
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
  complete: '{{@src}} → {{@dest}}'
  // complete: context => {
  //   console.log('  To get started:')
  //   console.log()
  //   context.inPlace || console.log(`    $ cd ${require('path').relative(process.cwd(), context.dest)}`)
  //   console.log('    $ npm install')
  //   console.log('    $ npm run dev')
  //   console.log()
  //   console.log('  Good luck~')
  // }
}
