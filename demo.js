// const download = require('download')

// download('https://coding.net/u/zce/p/demo/git/archive/master.zip', 'foo/test', { extract: true, strip: 1, mode: '666', headers: { accept: 'application/zip' } })
//   .then(data => console.log('ok'))
//   .catch(err => console.log(err))

const path = require('path')

const generate = require('./lib/generate')

generate(path.join(__dirname, 'test/mock/demo'), path.join(__dirname, 'test/dist'))
