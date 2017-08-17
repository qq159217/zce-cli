const assert = require('assert')
const list = require('../../lib/list')

describe('lib/list', function () {
  this.timeout(10000)
  process.env.NODE_ENV = 'testing'

  describe('#list-basic', () => {
    it('Short return an array and log full list in console', () => {
      return list().then(data => assert.ok(Array.isArray(data)))
    })
  })

  describe('#list-short', () => {
    it('Short return an array and log short list in console', () => {
      return list(true).then(data => assert.ok(Array.isArray(data)))
    })
  })

  describe('#list-debug', () => {
    it('Short log full error info and exit process', () => {
      process.env.TEST_API = 'https://api.github.com/users/fake-users-12580/repos'

      return list(false, true).catch(assert.ok)
    })
  })
})
