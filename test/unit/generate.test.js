const fs = require('fs')
const path = require('path')
const assert = require('assert')
const rimraf = require('rimraf')
const generate = require('../../lib/generate')

describe('lib/generate', () => {
  before(() => rimraf.sync(path.join(__dirname, '../build')))

  describe('#generate-basic', () => {
    it('should generate basic -> build/basic', () => {
      const src = path.join(__dirname, '../mock/basic')
      const dest = path.join(__dirname, '../build/basic')
      const answers = { name: 'basic', hello: true }
      return generate(src, dest, answers).then(files => {
        assert.equal('demo.txt', Object.keys(files)[0])
        const content = fs.readFileSync(path.join(dest, 'demo.txt'), 'utf8')
        assert.equal('basic - hello world!', content.trim())
      })
    })
  })

  describe('#generate-template', () => {
    it('should generate template -> build/template', () => {
      const src = path.join(__dirname, '../mock/template')
      const dest = path.join(__dirname, '../build/template')
      const answers = { name: 'template' }
      const options = require(src)
      return generate(src, dest, answers, options).then(files => {
        assert.equal('demo.txt', Object.keys(files)[0])
        const content = fs.readFileSync(path.join(dest, 'demo.txt'), 'utf8')
        assert.equal('hello template', content.trim())
      })
    })
  })

  describe('#generate-filters', () => {
    it('should generate filters -> build/filters', () => {
      const src = path.join(__dirname, '../mock/filters')
      const dest = path.join(__dirname, '../build/filters')
      const answers = { name: 'filters', sass: false }
      const options = require(src)
      return generate(src, dest, answers, options).then(files => {
        assert.equal(2, Object.keys(files).length)
        assert.ok(fs.existsSync(path.join(dest, 'assets/style.css')))
      })
    })
  })

  describe('#generate-helpers', () => {
    it('should generate helpers -> build/helpers', () => {
      const src = path.join(__dirname, '../mock/helpers')
      const dest = path.join(__dirname, '../build/helpers')
      const answers = { name: 'helpers' }
      const options = require(src)
      return generate(src, dest, answers, options).then(files => {
        assert.equal('demo.txt', Object.keys(files)[0])
        const content = fs.readFileSync(path.join(dest, 'demo.txt'), 'utf8')
        assert.equal('HELPERS\n(1 === 1)\n(1 !== 2)', content.trim())
      })
    })
  })

  describe('#generate-error', () => {
    it('should generate error -> build/error', () => {
      const src = path.join(__dirname, '../mock/error')
      const dest = path.join(__dirname, '../build/error')
      const answers = {}
      return generate(src, dest, answers).catch(assert.ok)
    })
  })
})
