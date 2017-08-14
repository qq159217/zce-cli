// const download = require('download')

// download('https://coding.net/u/zce/p/demo/git/archive/master.zip', 'foo/test', { extract: true, strip: 1, mode: '666', headers: { accept: 'application/zip' } })
//   .then(data => console.log('ok'))
//   .catch(err => console.log(err))

const path = require('path')

const generate = require('./lib/generate')

const context = {
  source: path.join(__dirname, 'test/mock/jekyll'),
  target: path.join(__dirname, 'test/dist')
}

generate(context)
  .then(context => {
    context.template.compile && context.template.compile()
  })
  .catch(err => console.log(err))
