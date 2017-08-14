const minimatch = require('minimatch')

module.exports = (files, metalsmith, next) => {
  const metadata = metalsmith.metadata()
  const { filters } = metadata
  if (!filters) return next()

  const filenames = Object.keys(files)

  Object.keys(filters)
    .filter(glob => !filters[glob](metadata))
    .forEach(glob => {
      const match = minimatch.filter(glob, { dot: true, matchBase: true })
      filenames.forEach(file => match(file) && delete files[file])
    })

  next()
}
