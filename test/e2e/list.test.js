const assert = require('assert')
const list = require('../../lib/list')

process.env.NODE_ENV = 'testing'

describe('lib/list', function () {
  this.timeout(20000)

  describe('#list-basic', () => {
    it('Short return an array and log full list in console', () => {
      return list()
        .then(data => assert.ok(Array.isArray(data)))
        .catch(err => assert.ok(!err))
    })
  })

  describe('#list-short', () => {
    it('Short return an array and log short list in console', () => {
      return list(true)
        .then(data => assert.ok(Array.isArray(data)))
        .catch(err => assert.ok(!err))
    })
  })

  describe('#list-empty', () => {
    it('Short return an empty array and log `Not found available` in console', () => {
      process.env.TEST_API = 'https://api.github.com/users/fake-users/repos'

      return list(false, true)
        .then(data => assert.ok(Array.isArray(data)))
        .catch(err => assert.ok(!err))
    })
  })

  describe('#list-debug', () => {
    it('Short log full error info and exit process', () => {
      process.env.TEST_API = 'https://api.github.com/users/fake-users-12580/repos'
      delete process.env.GITHUB_PAT

      return list(false, true)
        .then(data => assert.ok(false))
        .catch(err => assert.throws(() => { throw err }, /Not Found|Forbidden/))
    })
  })
})
