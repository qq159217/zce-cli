const childProcess = require('child_process')
const inquirer = require('inquirer')
const validateName = require('validate-npm-package-name')
const semver = require('semver')
const rc = require('rc')

const defaultPrompts = {
  name: { type: 'input', message: 'name' }
}

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

const setVersionValidate = item => {
  const customValidate = item.validate

  item.validate = input => {
    const result = semver.valid(input)
    if (!result) {
      return `Sorry, The '${input}' is not a semantic version.`
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

const setDefaults = (dest, exists, name) => item => {
  switch (item.name) {
    case 'name':
      item.default = item.default || name
      // TODO: need valdate?
      setNameValidate(item)
      break
    case 'author':
      item.default = item.default || getAuthor()
      break
    case 'version':
      item.default = item.default || npmrc['init-version']
      setVersionValidate(item)
      break
    case 'license':
      item.default = item.default || npmrc['init-license']
      break
    case 'repo':
    case 'repository':
      if (exists) item.default = item.default || getRepository(dest)
      break
  }
  return item
}

/**
 * Prompt all questions
 * @param  {Object}  prompts Prompts
 * @param  {String}  dest    Destination path
 * @param  {Boolean} exists  Destination path exists
 * @param  {String}  name    Default name
 * @return {Promise}         Prompt promise
 */
module.exports = (prompts, dest, exists, name) => {
  prompts = Object.assign({}, defaultPrompts, prompts)

  const questions = Object.keys(prompts)
    .map(key => Object.assign({}, prompts[key], { name: key }))
    .map(setDefaults(dest, exists, name))

  console.log('\n🍭  Press ^C at any time to quit.\n')

  return inquirer.prompt(questions)
}
