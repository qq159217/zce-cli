const assert = require('assert')
const prompt = require('../../lib/prompt')
const patchInquirer = require('../common/patch-inquirer')

describe('lib/prompt', () => {
  describe('#prompt-basic', () => {
    it('Should return right answers', () => {
      const prompts = {
        name: { type: 'input', message: 'Project name' },
        author: { type: 'input', message: 'Project author' },
        version: { type: 'input', message: 'Project version' },
        license: { type: 'input', message: 'Project license' },
        repo: { type: 'input', message: 'Project repository' },
        repository: { type: 'input', message: 'Project repository' }
      }

      patchInquirer({
        name: 'foo',
        author: 'zce',
        version: '1.0.0',
        license: 'ISC',
        repo: 'https://github.com/zce/zce-cli.git',
        repository: 'https://github.com/zce/zce-cli.git'
      })

      return prompt(prompts, __dirname).then(answers => {
        assert.equal('foo', answers.name)
        assert.equal('zce', answers.author)
        assert.equal('1.0.0', answers.version)
        assert.equal('ISC', answers.license)
        assert.equal('https://github.com/zce/zce-cli.git', answers.repo)
        assert.equal('https://github.com/zce/zce-cli.git', answers.repository)
      })
    })
  })

  describe('#prompt-custom-validate', () => {
    const prompts = {
      name: {
        type: 'input',
        message: 'Project name',
        validate: input => !!input
      },
      version: {
        type: 'input',
        message: 'Project version',
        validate: input => !!input
      }
    }

    it('Should return right answers', () => {
      patchInquirer({
        name: 'foo',
        version: '1.0.0'
      })

      return prompt(prompts, __dirname).then(answers => {
        assert.equal('foo', answers.name)
        assert.equal('1.0.0', answers.version)
      })
    })

    it('Should return right answers', () => {
      patchInquirer({
        name: 'FOO',
        version: '1-0-0'
      })

      return prompt(prompts, __dirname).then(answers => {
        assert.equal('FOO', answers.name)
        assert.equal('1-0-0', answers.version)
      })
    })
  })

  describe('#prompt-default', () => {
    it('Should return right answers', () => {
      const prompts = {
        name: { type: 'input', message: 'Project name' },
        repository: { type: 'input', message: 'Project repository' }
      }

      patchInquirer({})

      return prompt(prompts, __dirname, true, 'foo').then(answers => {
        assert.equal('foo', answers.name)
        assert.equal('https://github.com/zce/zce-cli.git', answers.repository)
      })
    })
  })
})
