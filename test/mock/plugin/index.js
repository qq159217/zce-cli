module.exports = {
  plugin: (files, app, next) => {
    next()
    const contents = files['zce.txt'].contents.toString().trim()
    files['zce.txt'].contents = Buffer.from(contents + ' intercept')
  }
}
