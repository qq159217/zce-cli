const fs = require('fs')
const path = require('path')
const assert = require('assert')
const rimraf = require('rimraf')
const generate = require('../../lib/generate')

describe('lib/generate', () => {
  before(() => rimraf.sync(path.join(__dirname, '../mock/build')))

  describe('#generate-basic', () => {
    it('should generate basic -> build/basic', () => {
      const src = path.join(__dirname, '../mock/basic')
      const dest = path.join(__dirname, '../mock/build/basic')
      const answers = { name: 'basic', hello: true }
      return generate(src, dest, answers).then(files => {
        assert.equal('demo.txt', Object.keys(files)[0])
        const content = fs.readFileSync(path.join(dest, 'demo.txt'), 'utf8')
        assert.equal('basic - hello world!', content.trim())
      })
    })
  })

  describe('#generate-filters', () => {
    it('should generate filters -> build/filters', () => {
      const src = path.join(__dirname, '../mock/filters')
      const dest = path.join(__dirname, '../mock/build/filters')
      const answers = { name: 'filters', sass: false }
      const options = require(src)
      return generate(src, dest, answers, options).then(files => {
        assert.equal(2, Object.keys(files).length)
        assert.ok(fs.existsSync(path.join(dest, 'assets/style.css')))
      })
    })
  })
})
