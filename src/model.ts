export type GqlType<N extends string, T extends object> = T & { __typename: N }

export type Uuid = string
export type UserId = string
export type ExternalLinkId = string
export type SkillId = string
export type LanguageSkillId = string
export type ExperienceUuid = Uuid
export type ProfileItemUuid = Uuid
export type AwardUuid = ProfileItemUuid
export type CertificationUuid = ProfileItemUuid
export type Slug = string

export type Path = string
export type Token = string
export type WantedlyUrl<P extends Path> = `https://www.wantedly.com/${P}`
export type UsersUrl<U extends UserId, P extends Path> = WantedlyUrl<`users/${U}/${P}`>
export type TokenizedUrl<U extends WantedlyUrl<Path>, T extends Token> = `${U}?t=${T}`
export type AvatarImageUrl<U extends UserId> = TokenizedUrl<UsersUrl<U, 'avatar'>, Token>
export type CoverImageUrl<U extends UserId> = TokenizedUrl<UsersUrl<U, 'cover_image'>, Token>

export type NameParts = GqlType<'ProfileNameParts', {
  firstName: string
  lastName: string
}>

export type ExternalLink<E extends ExternalLinkId> = GqlType<'ProfileExternalLink', {
  id: E
  url: string
  faviconUrl?: string
  displayLabel: string
}>

export type SocialProfileProvider = 'TWITTER' | 'FACEBOOK' | 'LINKEDIN' | 'GITHUB' | 'GOOGLE' | 'APPLE'
export type SocialProfile = GqlType<'SocialProfile', {
  provider: SocialProfileProvider
  isConnected: boolean
  profileUrl: string
}>

export type PageLinkCollection = GqlType<'ProfilePageLinkCollection', {
  externalLinks: Array<ExternalLink<ExternalLinkId>>
  socialProfiles: SocialProfile[]
}>

export type Company = GqlType<'Company', {
  slug: Slug
  avatarUrl: string
}>

export type YearMonth = GqlType<'YearMonth', {
  year: number
  month: number
}>

export type Duration = GqlType<'YearMonthDuration', {
  start: YearMonth
  end?: YearMonth
}>

export interface ExperienceBase<E extends ExperienceUuid> {
  uuid: E
  duration: Duration
}

export type EmploymentType = 'FULL_TIME' | 'PART_TIME' | 'INTERNSHIP'
export type WorkExperience<E extends ExperienceUuid> = GqlType<'WorkExperience', ExperienceBase<E> & {
  company: Company
  companyName: string
  description: string
  position: string
  employmentType: EmploymentType
}>

export type Education<E extends ExperienceUuid> = GqlType<'Education', ExperienceBase<E> & {
  schoolName: string
  major: string
  description: string
}>

export type Experience<E extends ExperienceUuid> = WorkExperience<E> | Education<E>

export type ExperienceType = 'WORK_EXPERIENCE' | 'EDUCATION'
export type LifeStoryChapterSection = GqlType<'ProfilePageLifeStoryExperienceSection', {
  experienceUuid: ExperienceUuid
  experienceType: ExperienceType
  experience: Experience<ExperienceUuid>
}>

export type LifeStoryChapter = GqlType<'ProfilePageLifeStoryExperienceChapter', {
  sections: LifeStoryChapterSection[]
}>

export type LifeStory = GqlType<'ProfilePageLifeStory', {
  chapters: LifeStoryChapter[]
}>

export type SkillEndorsement = GqlType<'SkillEndorsement', {
  enabled: boolean
  done: boolean
  count: number
}>

export type Skill<S extends SkillId> = GqlType<'Skill', {
  id: S
  name: string
  endorsement: SkillEndorsement
}>

export interface ProfileItemBase<P extends ProfileItemUuid> {
  uuid: P
  title: string
  description: string
  url: string
}

export type Award<A extends AwardUuid> = GqlType<'Award', ProfileItemBase<A> & {
  experienceUuid: ExperienceUuid
  receiveTime: YearMonth
}>

export type Certification<C extends CertificationUuid> = GqlType<'Certification', ProfileItemBase<C> & {
  acquireTime: YearMonth
}>

export type ProfileItem<P extends ProfileItemUuid> = Award<P> | Certification<P>

export interface AppendixCategoryBase {
  title: string
}

export type SkillAppendix = GqlType<'ProfilePageSkillAppendix', AppendixCategoryBase & {
  skills: Array<Skill<SkillId>>
}>

export type ProfileItemAppendix = GqlType<'ProfilePageCertificationAppendix', AppendixCategoryBase & {
  profileItems: Array<ProfileItem<ProfileItemUuid>>
}>

export type AppendixCategory = SkillAppendix | ProfileItemAppendix
export type Appendix = GqlType<'ProfilePageProfileItemAppendix', {
  categories: AppendixCategory[]
}>

export type LanguageSkillLevel = 'BUSINESS' | 'NATIVE' | 'EVERYDAY'
export type LanguageSkill<L extends LanguageSkillId> = GqlType<'LanguageSkill', {
  id: L
  name: string
  level: LanguageSkillLevel
}>

export type Profile<U extends UserId> = GqlType<'Profile', {
  userId: U
  name: string
  nameParts: NameParts
  namePartsEn: NameParts
  namePartsPhonetic: NameParts
  slug: Slug
  tagline: string
  introduction: string
  shortDescription: string
  location: string
  avatarUrl: AvatarImageUrl<U>
  rawAvatarUrl: AvatarImageUrl<U>
  coverImageUrl: CoverImageUrl<U>
  rawCoverImageUrl: CoverImageUrl<U>
  profilePageLinkCollection: PageLinkCollection
  profilePageLifeStory: LifeStory
  profilePageAppendix: Appendix
  languageSkills: Array<LanguageSkill<LanguageSkillId>>
}>

export type User<U extends UserId> = GqlType<'User', {
  id: U
  profile: Profile<U>
}>

export type QueryResponse<T, K extends string> = {
  [key in K]: T
}

export type UserByIdResponse<U extends UserId> = QueryResponse<User<U>, 'userById'>
