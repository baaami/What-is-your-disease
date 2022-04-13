import Axios, { AxiosRequestConfig } from 'axios'
import { BASE_URL, GET, JSON_HEADER } from 'shared/api_constant'

export const posts = {
  getLatestPosts: async (page: number, per_page: number) => {
    const token = localStorage.getItem('jwttoken')
    const config: AxiosRequestConfig = {
      method: GET,
      url: `${BASE_URL}/api/posts/latest`,
      headers: {
        ...JSON_HEADER,
        Authorization: `Bearer ${token}`,
      },
      params: {
        page,
        pageNum: per_page,
      },
    }

    return Axios(config)
  },
  getHotPosts: async () => {
    const token = localStorage.getItem('jwttoken')
    const config: AxiosRequestConfig = {
      method: GET,
      url: `${BASE_URL}/api/posts/hot`,
      headers: {
        ...JSON_HEADER,
        Authorization: `Bearer ${token}`,
      },
    }

    return Axios(config)
  },
  getMyPosts: async (id: string, page: number, per_page: number) => {
    const token = localStorage.getItem('jwttoken')
    const config: AxiosRequestConfig = {
      method: GET,
      url: `${BASE_URL}/api/posts/user/${id}`,
      headers: {
        ...JSON_HEADER,
        Authorization: `Bearer ${token}`,
      },
      params: {
        page,
        pageNum: per_page,
      },
    }
    return Axios(config)
  },
  getFilterPosts: async (
    orderBy: string,
    page: number,
    per_page: number,
    diseasePeriod?: string,
  ) => {
    const token = localStorage.getItem('jwttoken')
    const config: AxiosRequestConfig = {
      method: GET,
      url: `${BASE_URL}/api/posts/filter`,
      headers: {
        ...JSON_HEADER,
        Authorization: `Bearer ${token}`,
      },
      params: {
        page,
        pageNum: per_page,
        orderBy: orderBy,
        diseasePeriod,
      },
    }
    return Axios(config)
  },
  getCategoryPosts: async (
    category: string,
    page: number,
    per_page: number,
    diseasePeriod?: string,
    orderBy?: string,
  ) => {
    const token = localStorage.getItem('jwttoken')
    const config: AxiosRequestConfig = {
      method: GET,
      url: `${BASE_URL}/api/posts/`,
      headers: {
        ...JSON_HEADER,
        Authorization: `Bearer ${token}`,
      },
      params: {
        category,
        page,
        pageNum: per_page,
        diseasePeriod,
        orderBy,
      },
    }
    return Axios(config)
  },
  getTagSearch: async (
    hashtag: string,
    page: number,
    per_page: number,
    diseasePeriod?: string,
    orderBy?: string,
  ) => {
    const token = localStorage.getItem('jwttoken')
    const config: AxiosRequestConfig = {
      method: GET,
      url: `${BASE_URL}/api/posts/filter/`,
      headers: {
        ...JSON_HEADER,
        Authorization: `Bearer ${token}`,
      },
      params: {
        tag: hashtag,
        page,
        pageNum: per_page,
        diseasePeriod,
        orderBy,
      },
    }
    return Axios(config)
  },
  getSearchPosts: async (
    value: string,
    page: number,
    per_page: number,
    diseasePeriod?: string,
    orderBy?: string,
  ) => {
    const token = localStorage.getItem('jwttoken')
    const config: AxiosRequestConfig = {
      method: GET,
      url: `${BASE_URL}/api/search/`,
      headers: {
        ...JSON_HEADER,
        Authorization: `Bearer ${token}`,
      },
      params: {
        q: value,
        page,
        pageNum: per_page,
        diseasePeriod,
        orderBy,
      },
    }
    return Axios(config)
  },
  getFollowPosts: async (page: number, postNum: number) => {
    const token = localStorage.getItem('jwttoken')
    const config: AxiosRequestConfig = {
      method: GET,
      url: `${BASE_URL}/api/posts/follow/`,
      headers: {
        ...JSON_HEADER,
        Authorization: `Bearer ${token}`,
      },
      params: {
        page,
        postNum,
      },
    }
    return Axios(config)
  },
}
