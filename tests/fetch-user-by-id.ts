import { equal } from 'assert'

import { Client } from '../src'

// https://www.wantedly.com/siketyan
const userId = '79008489'

export default async (): Promise<void> => {
  const client = Client.default()
  const user = await client.fetchUserById(userId)

  console.log(user)

  equal(user.id, userId)
  equal(user.profile.name, 'Naoki Ikeguchi')
  equal(user.profile.slug, 'siketyan')
}
