export interface CreatePostModel {
  title: string
  body: string
  category: string
}

export interface PostUserModel extends ProfileModel {
  provider?: string
  providerId: string
  _id: string
  info: {
    name: string
    age: number | string
    gender: string
    nickname: string
    bloodtype?: string
    allergy?: Array<string>
    medicines?: Array<string>
  }
  followerIds?: string[]
  followingIds?: string[]
}

export interface ProfileModel {
  followers?: PostUserModel[]
  followings?: PostUserModel[]
}
