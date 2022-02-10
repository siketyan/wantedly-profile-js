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

const token = 'YOUR_JWT_TOKEN'
const client = Client.default(token)

console.log(await client.fetchUserById('YOUR_USER_ID'))
```
