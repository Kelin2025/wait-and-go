const createWaiter = name => {
  const cbs = []

  const waitAndGo = (cb, params) => {
    cbs.push(cb)
  }

  const resolve = payload => {
    cbs.forEach(cb => cb(payload))
  }

  waitAndGo.do = cb => {
    Promise.resolve(cb()).then(resolve)
  }

  return waitAndGo
}

module.exports = createWaiter
