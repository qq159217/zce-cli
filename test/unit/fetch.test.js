const os = require('os')
const fs = require('fs')
const path = require('path')
const assert = require('assert')
const rimraf = require('rimraf')
const fetch = require('../../lib/fetch')

describe('lib/fetch', function () {
  this.timeout(10000)
  rimraf.sync(path.join(os.homedir(), '.zce-templates/*'))

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

    it('should fetch repo: https://github.com/zce-templates/mock-unit', () => {
      return fetch('zce-templates/mock-unit')
        .then(source => assert.ok(fs.existsSync(source)))
    })
  })

  describe('#fetch-with-offline-mode', () => {
    it('should find cache: https://github.com/zce-templates/mock-unit', () => {
      return fetch('mock-unit', true)
        .then(source => assert.ok(fs.existsSync(source)))
    })

    it('should find cache: https://github.com/zce-templates/demo', () => {
      return fetch('zce-templates/demo', true)
        .then(source => assert.ok(fs.existsSync(source)))
    })
  })

  describe('#fetch-with-full-uri', () => {
    it('should fetch repo: https://coding.net/u/zce/p/mock-unit/git/archive/master', () => {
      return fetch('https://coding.net/u/zce/p/mock-unit/git/archive/master')
        .then(source => assert.ok(fs.existsSync(source)))
    })
  })

  describe('#fetch-with-error', () => {
    it('should fetch repo failed: https://github.com/zce-templates/fake-unit', () => {
      return fetch('zce-templates/fake-unit').catch(assert.ok)
    })
  })
})
