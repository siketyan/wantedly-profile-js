# wantedly-profile-js
🚀 Easy and strongly-typed Wantedly profiles fetcher.

<!--
## 📦 Installation
```shell
pnpm install @siketyan/wantedly-profile-js
```
-->

## ✨ Usage
```ts
import { Client } from '@siketyan/wantedly-profile-js'

const token = 'YOUR_JWT_TOKEN'
const client = Client.default(token)

console.log(await client.fetchUserById('YOUR_USER_ID'))
```
