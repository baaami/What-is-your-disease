import Axios, { AxiosRequestConfig } from 'axios'
import { BASE_URL, GET, POST, JSON_HEADER } from 'shared/api_constant'
import { UserInfoModel } from '../model/authModel'

export const user = {
  getUserProfile: async (uid: string) => {
    const token = localStorage.getItem('jwttoken')
    const config: AxiosRequestConfig = {
      method: GET,
      url: `${BASE_URL}/api/user/profile/${uid}`,
      headers: {
        ...JSON_HEADER,
        Authorization: `Bearer ${token}`,
      },
    }

    return Axios(config)
  },
  addFollow: async (follow_id: string) => {
    const token = localStorage.getItem('jwttoken')
    const config: AxiosRequestConfig = {
      method: POST,
      url: `${BASE_URL}/api/user/follow`,
      headers: {
        ...JSON_HEADER,
        Authorization: `Bearer ${token}`,
      },
      params: {
        followId: follow_id,
      },
    }
    return Axios(config)
  },
  removeFollow: async (unFollow_id: string) => {
    const token = localStorage.getItem('jwttoken')
    const config: AxiosRequestConfig = {
      method: POST,
      url: `${BASE_URL}/api/user/unfollow`,
      headers: {
        ...JSON_HEADER,
        Authorization: `Bearer ${token}`,
      },
      params: {
        unfollowId: unFollow_id,
      },
    }
    return Axios(config)
  },
  getPushList: async () => {
    const token = localStorage.getItem('jwttoken')
    const config: AxiosRequestConfig = {
      method: POST,
      url: `${BASE_URL}/api/push`,
      headers: {
        ...JSON_HEADER,
        Authorization: `Bearer ${token}`,
      },
    }

    return Axios(config)
  },
  confirmPush: async (pushId: string) => {
    const token = localStorage.getItem('jwttoken')
    const config: AxiosRequestConfig = {
      method: POST,
      url: `${BASE_URL}/api/push/confirm`,
      headers: {
        ...JSON_HEADER,
        Authorization: `Bearer ${token}`,
      },
      params: {
        pushId,
      },
    }
    return Axios(config)
  },
}
