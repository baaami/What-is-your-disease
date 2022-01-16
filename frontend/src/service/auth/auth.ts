import Axios, { AxiosRequestConfig } from 'axios'
import { BASE_URL, GET, JSON_HEADER } from 'shared/api_constant'

export const auth = {
  logout: async () => {
    const token = localStorage.get('jwttoken')
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
}
