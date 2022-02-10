import { User, UserId } from './model'
import { Config as GqlConfig, exec, userByIdQuery } from './graphql'

export interface Config {
  graphql: GqlConfig
}

// noinspection JSUnusedGlobalSymbols
export class Client {
  private readonly executeQuery: ReturnType<typeof exec>

  constructor (
    config: Config
  ) {
    this.executeQuery = exec(config.graphql)
  }

  async fetchUserById<U extends UserId>(id: UserId): Promise<User<U>> {
    return await this.executeQuery('userById', userByIdQuery, {
      userId: id
    })
  }

  static default (token: string): Client {
    return new Client({
      graphql: {
        url: 'https://graphql-gateway.wantedly.com/graphql',
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    })
  }
}
