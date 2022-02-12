import { QueryResponse, UserByIdResponse, UserId } from './model'
import request, { Variables } from 'graphql-request'

// @ts-expect-error
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export type Query<N extends string, T extends QueryResponse<unknown, N>, V extends Variables | undefined> = string

export const userByIdQuery: Query<'userById', UserByIdResponse<UserId>, {userId: UserId}> = `
query ($userId: String!) {
  userById(userId: $userId) {
    id
    profile {
      userId
      name
      nameParts {
        ...NameParts
      }
      namePartsEn {
        ...NameParts
      }
      namePartsPhonetic {
        ...NameParts
      }
      slug
      tagline
      introduction
      shortDescription
      location
      avatarUrl
      rawAvatarUrl
      coverImageUrl
      rawCoverImageUrl
      profilePageLinkCollection {
        ...LinkCollection
      }
      profilePageLifeStory {
        chapters {
          ...LifeStoryExperiencesChapter
        }
        __typename
      }
      profilePageAppendix {
        categories {
          ...SkillAppendix
          ...ProfileItemAppendix
        }
        __typename
      }
      languageSkills {
        id
        name
        level
        __typename
      }
      __typename
    }
    __typename
  }
}

fragment NameParts on ProfileNameParts {
  firstName
  lastName
  __typename
}

fragment YearMonth on YearMonth {
  year
  month
  __typename
}

fragment LinkCollection on ProfilePageLinkCollection {
  externalLinks {
    id
    url
    faviconUrl
    displayLabel
    __typename
  }
  socialProfiles {
    provider
    isConnected
    profileUrl
    __typename
  }
  __typename
}

fragment LifeStoryExperiencesChapter on ProfilePageLifeStoryExperiencesChapter {
  sections {
    experienceUuid
    experienceType
    experience {
      ... on WorkExperience {
        uuid
        company {
          ... on Company {
            slug
            avatarUrl
          }
          __typename
        }
        companyName
        displayPosition
        description
        position
        employmentType
        displayNameAndPositionSlashed
        duration {
          start {
            year
            month
            __typename
          }
          end {
            year
            month
            __typename
          }
          __typename
        }
        __typename
      }
      ... on Education {
        uuid
        schoolName
        major
        description
        displayNameAndPositionSlashed
        duration {
          start {
            ...YearMonth
          }
          end {
            ...YearMonth
          }
          __typename
        }
        __typename
      }
      __typename
    }
    __typename
  }
  __typename
}

fragment SkillAppendix on ProfilePageSkillAppendix {
  skills {
    id
    name
    endorsement {
      enabled
      done
      count
      users(first: 3) {
        edges {
          node {
            id
            profile {
              userId
              name
              avatarUrl
              shortDescription
              __typename
            }
            systemInfo {
              isOfficialProfile
            }
            __typename
          }
          __typename
        }
        __typename
      }
      __typename
    }
    __typename
  }
  __typename
}

fragment ProfileItemAppendix on ProfilePageProfileItemAppendix {
  title
  profileItems {
    ...AwardProfileItem
    ...CertificationProfileItem
  }
  __typename
}

fragment AwardProfileItem on Award {
  uuid
  experienceUuid
  title
  description
  url
  receiveTime {
    ...YearMonth
  }
  __typename
}

fragment CertificationProfileItem on Certification {
  uuid
  title
  description
  url
  acquireTime {
    ...YearMonth
  }
  __typename
}
`

export interface Config {
  url: string
  headers?: HeadersInit
}

export const exec = (config: Config) => async <
  T, N extends string,
  R extends QueryResponse<T, N>,
  V extends Variables,
>(n: N, q: Query<N, R, V>, v: V): Promise<T> => {
  return ((await request(config.url, q, v, config.headers)))[n]
}
