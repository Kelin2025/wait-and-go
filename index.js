const createWaiter = name => {
  let resolver = null

  let prev = new Promise(resolve => {
    resolver = resolve
  })

  const waitAndGo = (cb, params) => {
    let next = prev
    if (!params || !params.skipFailed) {
      next = prev.catch(() => null)
    }
    next = prev.then(prev => Promise.resolve(cb(prev)))

    if (params && params.replace) {
      prev = next
    }

    return next
  }

  waitAndGo.do = cb => {
    prev = Promise.resolve(cb())
    if (resolver) {
      resolver(prev)
      resolver = null
    }
  }

  return waitAndGo
}

module.exports = createWaiter
