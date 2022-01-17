export interface CreatePostModel {
  title: string
  body: string
  category: string
  user: PostUserModel
}

export interface PostUserModel {
  provider?: string
  providerId: string
  _id: string
  info: {
    name: string
    age: number | string
    gender: string
    bloodtype?: string
    allergy?: Array<string>
    medicines?: Array<string>
  }
}
