import Axios, { AxiosRequestConfig } from 'axios'
import { BASE_URL, GET, PATCH, JSON_HEADER } from 'shared/api_constant'
import { UserInfoModel } from '../model/authModel'
export const auth = {
  updateUserInfo: async (userInfo: UserInfoModel) => {
    const token = localStorage.getItem('jwttoken')
    const config: AxiosRequestConfig = {
      method: PATCH,
      url: '/api/userinfo/update',
      headers: {
        ...JSON_HEADER,
        Authorization: `Bearer ${token}`,
      },
      data: {
        ...userInfo,
      },
    }
    return Axios(config)
  },
  logout: async () => {
    const token = localStorage.getItem('jwttoken')
    const config: AxiosRequestConfig = {
      method: GET,
      url: 'api/auth/logout',
      headers: {
        ...JSON_HEADER,
        Authorization: `Bearer ${token}`,
      },
    }

    return Axios(config)
  },
  getUserInfo: async () => {
    const token = localStorage.getItem('jwttoken')
    const config: AxiosRequestConfig = {
      method: GET,
      url: 'api/userinfo/accounts',
      headers: {
        ...JSON_HEADER,
        Authorization: `Bearer ${token}`,
      },
    }

    return Axios(config)
  },
}
