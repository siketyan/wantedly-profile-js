import { exec, type Config as GqlConfig, userByIdQuery } from './graphql.js'
import type { User, UserId } from './model.js'

export * from './graphql.js'
export * from './model.js'

export interface Config {
  graphql: GqlConfig
}

// noinspection JSUnusedGlobalSymbols
export class Client {
  private readonly executeQuery: ReturnType<typeof exec>

  constructor(private readonly config: Config) {
    this.executeQuery = exec(config.graphql)
  }

  async fetchUserById<U extends UserId>(id: UserId): Promise<User<U>> {
    return await this.executeQuery('userById', userByIdQuery, {
      userId: id,
    })
  }

  withAuthentication(token: string): Client {
    return new Client({
      ...this.config,
      graphql: {
        ...this.config.graphql,
        headers: {
          ...this.config.graphql.headers,
          Authorization: `Bearer ${token}`,
        },
      },
    })
  }

  static default(): Client {
    return new Client({
      graphql: {
        url: 'https://graphql-gateway.wantedly.com/graphql',
      },
    })
  }
}
