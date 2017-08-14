module.exports = {
  equal: (a, b, opts) => a === b ? opts.fn(this) : opts.inverse(this),
  unequal: (a, b, opts) => a !== b ? opts.fn(this) : opts.inverse(this)
}
