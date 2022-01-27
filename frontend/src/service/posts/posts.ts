import Axios, { AxiosRequestConfig } from 'axios'
import { BASE_URL, GET, JSON_HEADER } from 'shared/api_constant'

export const posts = {
  getLatestPosts: async () => {
    const token = localStorage.getItem('jwttoken')
    const config: AxiosRequestConfig = {
      method: GET,
      url: `/api/posts/latest`,
      headers: {
        ...JSON_HEADER,
        Authorization: `Bearer ${token}`,
      },
    }

    return Axios(config)
  },
  getHotPosts: async () => {
    const token = localStorage.getItem('jwttoken')
    const config: AxiosRequestConfig = {
      method: GET,
      url: '/api/posts/hot',
      headers: {
        ...JSON_HEADER,
        Authorization: `Bearer ${token}`,
      },
    }

    return Axios(config)
  },
  getMyPosts: async (id: string) => {
    const token = localStorage.getItem('jwttoken')
    const config: AxiosRequestConfig = {
      method: GET,
      url: `/api/posts/user/${id}`,
      headers: {
        ...JSON_HEADER,
        Authorization: `Bearer ${token}`,
      },
    }
    return Axios(config)
  },
  getFilterPosts: async (orderBy: string) => {
    const token = localStorage.getItem('jwttoken')
    const config: AxiosRequestConfig = {
      method: GET,
      url: `/api/posts/filter/${orderBy}`,
      headers: {
        ...JSON_HEADER,
        Authorization: `Bearer ${token}`,
      },
    }
    return Axios(config)
  },
  getCategoryPosts: async (category: string) => {
    const token = localStorage.getItem('jwttoken')
    const config: AxiosRequestConfig = {
      method: GET,
      url: `/api/posts/`,
      headers: {
        ...JSON_HEADER,
        Authorization: `Bearer ${token}`,
      },
      params: {
        category,
      },
    }
    return Axios(config)
  },
}
