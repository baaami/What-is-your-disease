import Axios, { AxiosRequestConfig } from 'axios'
import { BASE_URL, GET, POST, JSON_HEADER } from 'shared/api_constant'
import { UserInfoModel } from '../model/authModel'

export const user = {
  getUserProfile: async (uid: string) => {
    const token = localStorage.getItem('jwttoken')
    const config: AxiosRequestConfig = {
      method: GET,
      url: `/api/user/profile/${uid}`,
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
      url: `/api/user/follow`,
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
      url: `/api/user/unfollow`,
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
}
