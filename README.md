# wantedly-profile-js
🚀 Easy and strongly-typed Wantedly profiles fetcher.

## 📦 Installation
```shell
pnpm add wantedly-profile
```

## ✨ Usage
```ts
import { Client } from 'wantedly-profile'

const client = Client.default()
// Optionally add your authn: client.authenticated(token)

console.log(await client.fetchUserById('YOUR_USER_ID'))
```
