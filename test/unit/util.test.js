const os = require('os')
const path = require('path')
const assert = require('assert')
const util = require('../../lib/util')

describe('lib/util', () => {
  describe('#exists', () => {
    it('Should return true when the path exists', () => {
      return util.exists(process.cwd())
    })
  })

  describe('#existsSync', () => {
    it('Should return true when the path exists', () => {
      assert.ok(util.existsSync(process.cwd()))
    })

    it('Should return false when the path not exists', () => {
      assert.ok(!util.existsSync(path.resolve(Math.random().toString())))
    })
  })

  describe('#isLocalPath', () => {
    it('Should return true when input `./foo/bar`', () => {
      assert.ok(util.isLocalPath('./foo/bar'))
    })

    it('Should return true when input `../foo/bar`', () => {
      assert.ok(util.isLocalPath('../foo/bar'))
    })

    it('Should return true when input `/foo/bar`', () => {
      assert.ok(util.isLocalPath('/foo/bar'))
    })

    it('Should return true when input `c:/foo/bar`', () => {
      assert.ok(util.isLocalPath('c:/foo/bar'))
    })

    it('Should return true when input `D:/foo/bar`', () => {
      assert.ok(util.isLocalPath('D:/foo/bar'))
    })

    it('Should return true when input `e:\\foo\\bar`', () => {
      assert.ok(util.isLocalPath('e:\\foo\\bar'))
    })

    it('Should return false when input `foo/bar`', () => {
      assert.ok(!util.isLocalPath('foo/bar'))
    })

    it('Should return false when input `bar`', () => {
      assert.ok(!util.isLocalPath('bar'))
    })

    it('Should return false when input `https://github.com/zce`', () => {
      assert.ok(!util.isLocalPath('https://github.com/zce'))
    })
  })

  describe('#getTemplateUrl', () => {
    it('Should return `https://github.com/zce-templates/foo/archive/master.zip` when input `foo`', () => {
      assert.equal(
        'https://github.com/zce-templates/foo/archive/master.zip',
        util.getTemplateUrl('foo')
      )
    })

    it('Should return `https://github.com/zce/foo/archive/master.zip` when input `zce/foo`', () => {
      assert.equal(
        'https://github.com/zce/foo/archive/master.zip',
        util.getTemplateUrl('zce/foo')
      )
    })

    it('Should return `https://github.com/zce-templates/foo/archive/next.zip` when input `foo#next`', () => {
      assert.equal(
        'https://github.com/zce-templates/foo/archive/next.zip',
        util.getTemplateUrl('foo#next')
      )
    })

    it('Should return `https://github.com/zce/foo/archive/next.zip` when input `zce/foo#next`', () => {
      assert.equal(
        'https://github.com/zce/foo/archive/next.zip',
        util.getTemplateUrl('zce/foo#next')
      )
    })

    it('Should return `https://zce.me/demo.zip` when input `https://zce.me/demo.zip`', () => {
      assert.equal(
        'https://zce.me/demo.zip',
        util.getTemplateUrl('https://zce.me/demo.zip')
      )
    })
  })

  describe('#tildify', () => {
    it('Should return `~/foo` when input `' + os.homedir() + '/foo`', () => {
      assert.equal(
        '~/foo',
        util.tildify(path.join(os.homedir(), 'foo'))
      )
    })

    it('Should return `~` when input `' + os.homedir() + '`', () => {
      assert.equal(
        '~',
        util.tildify(os.homedir())
      )
    })

    it('Should return `/foo` when input `/foo`', () => {
      assert.equal(
        '/foo',
        util.tildify('/foo')
      )
    })
  })

  describe('#untildify', () => {
    it('Should return `' + os.homedir() + '/foo` when input `~/foo`', () => {
      assert.equal(
        path.join(os.homedir(), 'foo'),
        util.untildify('~/foo')
      )
    })

    it('Should return `' + os.homedir() + '` when input `~`', () => {
      assert.equal(
        os.homedir(),
        util.untildify('~')
      )
    })

    it('Should return `/foo` when input `/foo`', () => {
      assert.equal(
        '/foo',
        util.untildify('/foo')
      )
    })
  })

  describe('#md5', () => {
    it('Should return `acbd18db4cc2f85cedef654fccc4a4d8` when input `foo`', () => {
      assert.equal(
        'acbd18db4cc2f85cedef654fccc4a4d8',
        util.md5('foo')
      )
    })
  })

  describe('#eval', () => {
    /* eslint-disable no-template-curly-in-string */
    it('Should return `foo bar` when input `foo ${msg}` and { msg: \'bar\' }', () => {
      assert.equal(
        'foo bar',
        util.eval('`foo ${msg}`', { msg: 'bar' })
      )
    })

    it('Should throw when code is invalid', () => {
      assert.throws(
        () => util.eval('fake code', { msg: 'bar' }),
        /evaluating/
      )
    })
  })
})
