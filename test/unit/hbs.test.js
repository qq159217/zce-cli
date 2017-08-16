const assert = require('assert')
const hbs = require('../../lib/hbs')

describe('lib/hbs', () => {
  // describe('#setOptions', () => {
  //   it('Should return true when the path exists', () => {
  //     hbs.setOptions({})
  //     assert.ok()
  //   })
  // })

  describe('#render', () => {
    it('Should return `hello world` when input `hello {{foo}}`', () => {
      assert.equal(
        'hello world',
        hbs.render('hello {{foo}}', { foo: 'world' })
      )
    })

    it('Should throw error when debug mode', () => {
      hbs.setOptions({ debug: true })
      assert.throws(
        () => hbs.render('hello {{foo}}'),
        /undefined/
      )
    })
  })

  describe('#registerHelper', () => {
    it('Should return `hello world` when input `hello {{lowercase foo}}`', () => {
      hbs.registerHelper('lowercase', str => str.toLowerCase())
      assert.equal(
        'hello world',
        hbs.render('hello {{lowercase foo}}', { foo: 'WORLD' })
      )
    })
  })
})
