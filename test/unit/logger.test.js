const assert = require('assert')
const logger = require('../../lib/logger')

describe('lib/logger', () => {
  describe('#log', () => {
    it('"Hello world" should be logged to the console', () => {
      logger.log('Hello world')
      assert.ok(true)
    })
  })

  describe('#dir', () => {
    it('"Hello world" should be logged to the console', () => {
      logger.dir('Hello world')
      assert.ok(true)
    })
  })

  describe('#info', () => {
    it('"Hello world" should be logged to the console', () => {
      logger.info('Hello world')
      assert.ok(true)
    })
  })

  describe('#warn', () => {
    it('"Hello world" should be logged to the console', () => {
      logger.warn('Hello world')
      assert.ok(true)
    })
  })

  describe('#error', () => {
    it('"Hello world" should be logged to the console', () => {
      logger.error('Hello world')
      assert.ok(true)
    })
  })
})
