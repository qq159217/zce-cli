const fs = require('fs')
const path = require('path')
const assert = require('assert')
const rimraf = require('rimraf')
const generate = require('../../lib/generate')

describe('lib/generate', () => {
  rimraf.sync(path.join(__dirname, '../build'))

  describe('#minima', () => {
    it('Should generate `minima` → `build/minima`', () => {
      const src = path.join(__dirname, '../mock/minima')
      const dest = path.join(__dirname, '../build/minima')
      const answers = { name: 'minima' }

      return generate(src, dest, answers)
        .then(files => {
          assert.ok(files['zce.txt'])
          const content = fs.readFileSync(path.join(dest, 'zce.txt'), 'utf8')
          assert.equal('hey minima', content.trim())
        })
    })
  })

  describe('#template-option', () => {
    it('Should generate `template` → `build/template`', () => {
      const src = path.join(__dirname, '../mock/template')
      const dest = path.join(__dirname, '../build/template')
      const answers = { name: 'template' }
      const options = require(src)

      return generate(src, dest, answers, options).then(files => {
        assert.ok(files['zce.txt'])
        const content = fs.readFileSync(path.join(dest, 'zce.txt'), 'utf8')
        assert.equal('hey template', content.trim())
      })
    })
  })

  describe('#filters-option', () => {
    it('Should generate `filters` → `build/filters`', () => {
      const src = path.join(__dirname, '../mock/filters')
      const dest = path.join(__dirname, '../build/filters')
      const answers = { sass: false }
      const options = require(src)

      return generate(src, dest, answers, options).then(files => {
        assert.equal(2, Object.keys(files).length)
        assert.ok(fs.existsSync(path.join(dest, 'assets/style.css')))
        assert.ok(!fs.existsSync(path.join(dest, 'assets/style.scss')))
      })
    })
  })

  describe('#helpers-option', () => {
    it('Should generate `helpers` → `build/helpers`', () => {
      const src = path.join(__dirname, '../mock/helpers')
      const dest = path.join(__dirname, '../build/helpers')
      const answers = { name: 'helpers' }
      const options = require(src)

      return generate(src, dest, answers, options).then(files => {
        assert.equal(2, Object.keys(files).length)
        const builtInContent = fs.readFileSync(path.join(dest, 'built-in.txt'), 'utf8')
        assert.equal('(1 === 1)\n(1 !== 2)', builtInContent.trim())
        const customContent = fs.readFileSync(path.join(dest, 'custom.txt'), 'utf8')
        assert.equal('HELPERS', customContent.trim())
      })
    })
  })

  describe('#error-handle', () => {
    it('Should catch a error when generate `error`', () => {
      const src = path.join(__dirname, '../mock/error')
      const dest = path.join(__dirname, '../build/error')
      const answers = {}

      return generate(src, dest, answers)
        .then(files => assert.ok(false))
        .catch(err => assert.throws(() => { throw err }, /Missing helper: "zce"/))
    })
  })
})
