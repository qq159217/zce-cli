const os = require('os')
const fs = require('fs')
const path = require('path')
const assert = require('assert')
const fetch = require('../../lib/fetch')

describe('lib/fetch', () => {
  describe('#fetch1', () => {
    it('should fetch https://github.com/zce-templates/demo', done => {
      return fetch('demo')
        .then(source => {
          const exists = fs.existsSync(path.join(os.homedir(), '.zce-templates/demo'))
        })
    })
  })
})
