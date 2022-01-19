import Axios, { AxiosRequestConfig } from 'axios'
import { BASE_URL, GET, JSON_HEADER, POST } from 'shared/api_constant'
import { CreatePostModel } from '../model/postModel'
export const post = {
  createPost: async (post_data: CreatePostModel) => {
    const token = localStorage.getItem('jwttoken')
    const config: AxiosRequestConfig = {
      method: POST,
      url: '/api/post/write',
      headers: {
        ...JSON_HEADER,
        Authorization: `Bearer ${token}`,
      },
      data: {
        ...post_data,
      },
    }
    return Axios(config)
  },
  getPost: async (post_id: string) => {
    const token = localStorage.getItem('jwttoken')
    const config: AxiosRequestConfig = {
      method: GET,
      url: `/api/post/${post_id}`,
      headers: {
        ...JSON_HEADER,
        Authrization: `Bearer ${token}`,
      },
    }

    return Axios(config)
  },
}
