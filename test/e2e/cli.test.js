const path = require('path')
const { spawn } = require('child_process')
const assert = require('assert')
const rimraf = require('rimraf')

describe('cli', function () {
  this.timeout(0)
  rimraf.sync(path.join(__dirname, '../build'))

  describe('#list', () => {
    it('Should log list in console', done => {
      const init = spawn(process.execPath, [path.join(__dirname, '../../bin/zce-list.js'), 'list'], {
        env: {
          NODE_ENV: 'testing',
          TEST_API: 'https://api.github.com/users/fake-users/repos',
          GITHUB_PAT: process.env.GITHUB_PAT
        }
      })

      let output = ''

      init.stdout.on('data', data => {
        output += data
      })

      init.on('error', err => {
        assert.ok(!err)
        done()
      })

      init.on('close', () => {
        assert.equal('Not found available', output.trim())
        done()
      })
    })
  })

  // TODO: test init cli
  // describe('#init', () => {
  //   it('Should generate `zce-mock/e2e-test` → `build/cli-test`', done => {
  //     const init = spawn(process.execPath, [path.join(__dirname, '../../bin/zce-init.js'), 'init', 'zce-mock/e2e-test', 'cli-test'], {
  //       cwd: path.join(__dirname, '../build/'),
  //       env: {
  //         NODE_ENV: 'testing',
  //         TEST_API: 'https://api.github.com/users/fake-users/repos'
  //       }
  //     })

  //     let output = ''

  //     init.stdout.on('data', data => {
  //       output += data
  //     })

  //     init.on('error', err => {
  //       assert.ok(!err)
  //       done()
  //     })

  //     init.on('close', () => {
  //       assert.equal('Not found available', output.trim())
  //       done()
  //     })
  //   })
  // })
})
