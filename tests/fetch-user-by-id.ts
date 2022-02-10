import { equal } from 'assert';
import { env } from 'process'

import { Client } from '../src'

// https://www.wantedly.com/siketyan
const userId = '79008489'

export default async () => {
  const token = env['WANTEDLY_GQL_TOKEN']
  if (!token) {
    throw Error('The environment variable WANTEDLY_GQL_TOKEN is not set or empty.')
  }

  const client = Client.default(token)
  const user = await client.fetchUserById(userId);

  console.log(user)

  equal(user.id, userId)
  equal(user.profile.name, 'Naoki Ikeguchi')
  equal(user.profile.slug, 'siketyan')
}
