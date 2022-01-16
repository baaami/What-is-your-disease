import Axios, { AxiosRequestConfig } from 'axios'
import { BASE_URL, GET, JSON_HEADER } from 'shared/api_constant'

export const posts = {
  getPosts: async () => {
    const token = localStorage.getItem('jwttoken')
    const config: AxiosRequestConfig = {
      method: GET,
      url: `/api/posts/latest?page=0`,
      headers: {
        ...JSON_HEADER,
        Authorization: `Bearer ${token}`,
      },
    }

    return Axios(config)
  },
}
