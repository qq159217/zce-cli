const fs = require('fs')
const assert = require('assert')
const fetch = require('../../lib/fetch')

describe('lib/fetch', function () {
  this.timeout(6000)

  describe('#fetch-with-template-name', () => {
    it('should fetch repo: https://github.com/zce-templates/mock-unit', () => {
      return fetch('mock-unit')
        .then(source => assert.ok(fs.existsSync(source)))
    })
  })

  describe('#fetch-with-repo-name', () => {
    it('should fetch repo: https://github.com/zce-templates/mock-unit', () => {
      return fetch('zce-templates/mock-unit')
        .then(source => assert.ok(fs.existsSync(source)))
    })
  })

  describe('#fetch-with-offline-mode', () => {
    it('should find cache: https://github.com/zce-templates/mock-unit', () => {
      return fetch('zce-templates/mock-unit', true)
        .then(source => assert.ok(fs.existsSync(source)))
    })
  })

  describe('#fetch-with-full-uri', () => {
    it('should fetch repo: https://coding.net/u/zce/p/mock-unit/git/archive/master', () => {
      return fetch('https://coding.net/u/zce/p/mock-unit/git/archive/master')
        .then(source => assert.ok(fs.existsSync(source)))
    })
  })
})
