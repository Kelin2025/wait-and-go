# Wait and go

Tiny util to create cached + "wait-on" callbacks

## Installation

```
yarn add wait-and-go
```

## Usage

```js
import createWaiter from "wait-and-go"

// Create a Hachi
const afterAuth = createWaiter("After you are authorized")

// Call it somewhere
afterAuth(token => {
  console.log("Authorized", token)
})

// Resolve anywhere
afterAuth.do(() => Promise.resolve("my-secret-token"))
```

## How it works?

It's just a more accurate version of:

```js
let resolver
let promise = new Promise(r => {
  resolver = r
})

const auth = () => {
  promise = Promise.resolve("my-secret-token")
  resolver(promise)
}

const afterAuth = cb => promise.then(cb)

afterAuth(token => {
  console.log("Authorized", token)
})
```

## React hook (WHY NOT LUL)

```js
import createWaiter from "wait-and-go"
import { useWaiter } from "wait-and-go/react"

const afterAuth = createWaiter("After you are authorized")

const UserInfo = () => {
  const { isLoaded, data } = useWaiter(afterAuth)

  return isLoaded && <span>{data.nickname}</span>
}

// Somewhere
afterAuth({ nickname: "Kelin2025" })
```

With some additions
