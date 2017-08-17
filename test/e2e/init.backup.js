const path = require('path')
const assert = require('assert')
const rimraf = require('rimraf')
const init = require('../../lib/init')
const patchInquirer = require('../common/patch-inquirer')

describe('lib/init', function () {
  this.timeout(20000)
  process.env.NODE_ENV = 'testing'
  rimraf.sync(path.join(__dirname, '../build'))

  it('WIP', done => {
    patchInquirer({ name: 'foo', sass: true })

    init('mock-e2e', path.join(__dirname, '../build/e2e'), true, true)
      .then(context => {
        assert.equal('mock-e2e', context.template)
        assert.equal(path.join(__dirname, '../build/e2e'), context.dest)
        assert.equal(false, context.exists)
        assert.equal('foo', context.answers.name)
        assert.equal(true, context.answers.sass)
        patchInquirer({ ok: true, name: 'foo', sass: true })
        return init('mock-e2e', path.join(__dirname, '../build/e2e'), true, true)
      })
      .then(context => {
        assert.equal(true, context.exists)
        patchInquirer({})
        return init(path.join(__dirname, '../mock/basic'), path.join(__dirname, '../build/e2e-basic'), true, true)
      })
      .then(context => {
        assert.equal(path.join(__dirname, '../mock/basic'), context.template)
        patchInquirer({ ok: false })
        return init('mock-e2e', process.cwd(), true, true)
      })
      .catch(err => {
        assert.ok(err)
        patchInquirer({})
        return init('mock-unit', path.join(__dirname, '../build/e2e-error'), true, true)
      })
      .catch(err => {
        assert.ok(err)
        patchInquirer({ ok: false })
        return init('mock-e2e', undefined, true, true)
      })
      .catch(err => {
        assert.ok(err)
        done()
      })
  })
})
