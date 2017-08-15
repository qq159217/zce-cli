const childProcess = require('child_process')
const inquirer = require('inquirer')
const validateName = require('validate-npm-package-name')
const rc = require('rc')

const npmrc = rc('npm', {
  'init-author-name': '',
  'init-author-email': '',
  'init-author-url': '',
  'init-version': '0.1.0',
  'init-license': 'MIT'
})

const setNameValidate = item => {
  const customValidate = item.validate
  item.validate = input => {
    const result = validateName(input)
    if (!result.validForNewPackages) {
      const messages = (result.errors || []).concat(result.warnings || [])
      return `Sorry, ${messages.join(' and ')}.`
    }

    return typeof customValidate !== 'function' ? true : customValidate(input)
  }
}

const getAuthor = () => {
  const name = npmrc['init-author-name']
  const email = npmrc['init-author-email']
  const url = npmrc['init-author-url']
  let author = name
  email && (author += ` <${email}>`)
  url && (author += ` (${url})`)
  return author
}

const getRepository = dir => {
  // TODO: get repository uri
  try {

    return childProcess.execSync(`cd ${dir} && git config --local --get remote.origin.url`).toString().trim()
  } catch (e) {
  }
}

const setDefaults = context => item => {
  switch (item.name) {
    case 'name':
      item.default = item.default || context.name
      setNameValidate(item)
      break
    case 'author':
      item.default = item.default || getAuthor()
      break
    case 'version':
      item.default = item.default || npmrc['init-version']
      break
    case 'license':
      item.default = item.default || npmrc['init-license']
      break
    case 'repo':
    case 'repository':
      if (context.exists) item.default = item.default || getRepository(context.dest)
      break
  }
  return item
}

module.exports = (files, metalsmith, next) => {
  const context = metalsmith.metadata()
  const { prompts } = context.package

  if (!prompts) return next()

  const questions = Object.keys(prompts)
    .map(key => Object.assign({}, prompts[key], { name: key }))
    .map(setDefaults(context))

  console.log('\n🍭  Press ^C at any time to quit.\n')

  inquirer.prompt(questions).then(answers => {
    context.answers = answers
    next()
  })
}
