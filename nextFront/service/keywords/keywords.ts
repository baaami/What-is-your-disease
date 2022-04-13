import Axios, { AxiosRequestConfig } from 'axios'
import { GET, JSON_HEADER, BASE_URL } from 'shared/api_constant'

export const keywords = {
  getKeywords: async () => {
    const token = localStorage.getItem('jwttoken')
    const config: AxiosRequestConfig = {
      method: GET,
      url: `${BASE_URL}/api/keywords/list`,
      headers: {
        ...JSON_HEADER,
        Authorization: `Bearer ${token}`,
      },
    }

    return Axios(config)
  },
}
