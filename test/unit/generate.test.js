const fs = require('fs')
const path = require('path')
const assert = require('assert')
const inquirer = require('inquirer')
const rimraf = require('rimraf')
const generate = require('../../lib/generate')

function patchInquirer (answers) {
  inquirer.prompt = questions => {
    const _answers = {}
    questions.forEach(question => {
      const key = question.name
      if (question.validate) {
        const valid = question.validate(answers[key])
        if (!valid) throw new Error(valid)
      }
      _answers[key] = answers[key]
    })
    return Promise.resolve(_answers)
  }
}

describe('lib/generate', function () {
  this.timeout(0)
  rimraf.sync(path.join(__dirname, '../mock/build'))

  describe('#sample', () => {
    it('should generate sample -> build/sample', () => {
      const answers = {
        name: 'sample',
        hello: true
      }

      patchInquirer(answers)

      const context = {
        name: 'sample',
        src: path.join(__dirname, '../mock/sample'),
        dest: path.join(__dirname, '../mock/build/sample')
      }
      return generate(context).then(context => {
        const content = fs.readFileSync(path.join(context.dest, 'demo.txt'), 'utf8')
        assert.equal('sample - hello world!', content.trim())
      })
    })
  })

  describe('#filters', () => {
    it('should generate jekyll -> build/jekyll', () => {
      const answers = {
        name: 'jekyll',
        email: 'jekyll@example.com',
        description: 'A jekyll site',
        sass: false
      }

      patchInquirer(answers)

      const context = {
        name: 'jekyll',
        src: path.join(__dirname, '../mock/jekyll'),
        dest: path.join(__dirname, '../mock/build/jekyll')
      }
      return generate(context).then(context => {
        assert.ok(!fs.existsSync(path.join(context.dest, '_sass')))
      })
    })
  })
})
