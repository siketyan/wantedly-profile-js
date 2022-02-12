# wantedly-profile-js
🚀 Easy and strongly-typed Wantedly profiles fetcher.

## 📦 Installation
Make sure you logged into GitHub Packages Registry from (p)npm.
```shell
pnpm install @siketyan/wantedly-profile-js
```

## ✨ Usage
```ts
import { Client } from '@siketyan/wantedly-profile-js'

const client = Client.default()
// Optionally add your authn: client.authenticated(token)

console.log(await client.fetchUserById('YOUR_USER_ID'))
```
