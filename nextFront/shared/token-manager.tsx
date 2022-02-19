import axios, { HeadersDefaults } from 'axios'
import cookie from 'react-cookies'
// import { HTTP_ONLY } from "../config/config";

interface CommonHeaderProperties extends HeadersDefaults {
  Authorization: string
}

function setToken(accessToken: string, refreshToken?: string) {
  // axios.defaults.headers.common['Authorization'] = 'Bearer ' + accessToken
  axios.defaults.headers = {
    Authorization: `Bearer ${accessToken}`,
  } as CommonHeaderProperties

  const expires = new Date()
  expires.setDate(Date.now() + 1000 * 60 * 60 * 24)

  cookie.save('accessToken', accessToken, {
    path: '/',
    expires,
    httpOnly: false, // dev/prod 에 따라 true / false 로 받게 했다.
  })
  // cookie.save(
  //     'refreshToken'
  //     , refreshToken
  //     , {
  //         path: '/'
  //         , expires
  //         , httpOnly: HTTP_ONLY
  //     }
  // )
}

function removeToken() {
  cookie.remove('accessToken')
}

export { setToken, removeToken }
