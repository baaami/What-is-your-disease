import { PostUserModel } from 'service/model/postModel'

export interface PostModel {
  body: string
  category: string
  publishedDate: string
  title: string
  user: PostUserModel
  views: number
  __v: number
  _id: string
}
