const minimatch = require('minimatch')

module.exports = (files, metalsmith, next) => {
  const context = metalsmith.metadata()
  const { filters } = context.package

  if (!filters) return next()

  const filenames = Object.keys(files)

  Object.keys(filters)
    .filter(glob => !filters[glob](context.answers))
    .forEach(glob => {
      const match = minimatch.filter(glob, { dot: true, matchBase: true })
      filenames.forEach(file => match(file) && delete files[file])
    })

  next()
}
