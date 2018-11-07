const createWaiter = name => {
  const cbs = []
  const params = []

  const waitAndGo = (cb, p) => {
    cbs.push(cb)
    params.push(p || { once: false })
  }

  const resolve = payload => {
    cbs.forEach((cb, idx) => {
      cb(payload)
      if (params[idx].once) {
        cbs.splice(idx, 1)
        params.splice(idx, 1)
      }
    })
  }

  waitAndGo.do = cb => {
    Promise.resolve(cb()).then(resolve)
  }

  return waitAndGo
}

module.exports = createWaiter
