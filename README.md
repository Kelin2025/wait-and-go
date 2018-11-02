# Wait, then GO

Tiny util to create cached + "wait-on" callbacks

## Installation

```
yarn add wait-then-go
```

## Usage

```js
import createWaiter from "wait-then-go"

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
let promise = new Promise(r => { resolver = r })

const auth = () => {
  promise = Promise.resolve("my-secret-token")
  resolver(promise)
}

const afterAuth = promise.then(token => {
  console.log("Authorized", token)
)
```

With some additions
