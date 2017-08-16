const assert = require('assert')
const inquirer = require('inquirer')
const prompt = require('../../lib/prompt')

const prompts = {
  name: { type: 'input', message: 'Project name' },
  author: { type: 'input', message: "Project author" },
  version: { type: 'input', message: "Project version" },
  license: { type: 'input', message: "Project license" },
  repository: { type: 'input', message: "Project repository" }
}

const patchInquirer = fake => {
  inquirer.prompt = questions => {
    const result = {}
    questions.forEach(question => {
      const key = question.name
      if (question.validate) {
        const valid = question.validate(fake[key])
        if (!valid) throw new Error(valid)
      }
      result[key] = fake[key] || question.default
    })
    return Promise.resolve(result)
  }
}

describe('lib/prompt', () => {
  describe('#prompt-basic', () => {
    it('Should return right answers', () => {
      patchInquirer({
        name: 'foo',
        author: 'zce',
        version: '1.0.0',
        license: 'ISC',
        repository: 'https://github.com/zce/zce-cli.git'
      })

      return prompt(prompts, __dirname).then(answers => {
        assert.equal('foo', answers.name)
        assert.equal('zce', answers.author)
        assert.equal('1.0.0', answers.version)
        assert.equal('ISC', answers.license)
        assert.equal('https://github.com/zce/zce-cli.git', answers.repository)
      })
    })
  })

  describe('#prompt-default', () => {
    it('Should return right answers', () => {
      patchInquirer({})

      return prompt(prompts, __dirname, true, 'foo').then(answers => {
        assert.equal('foo', answers.name)
        assert.equal('https://github.com/zce/zce-cli.git', answers.repository)
      })
    })
  })
})
