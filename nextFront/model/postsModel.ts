import { PostUserModel } from 'service/model/postModel'

export interface PostModel {
  body: string
  category: string
  publishedDate: string
  likes: number
  likeMe: string[]
  title: string
  tags: Array<string>
  user: PostUserModel
  views: number
  __v: number
  _id: string
}
