import React from "react"

export const useWaiter = waitOn => {
  const [isLoaded, setLoaded] = React.useState(false)
  const [data, setData] = React.useState(null)

  waitOn(data => {
    setLoaded(true)
    setData(data)
  })

  return { isLoaded, data }
}
