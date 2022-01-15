import * as config from '../config'

const KAKAO_CLIENT_ID = config.KAKAO_CLIENT_ID
const KAKAO_REDIRECT_URI = 'http://localhost:3001/api/auth/callback/kakao'

export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_CLIENT_ID}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code`

const NAVER_CLIENT_ID = config.NAVER_CLIENT_ID
const NAVER_REDIRECT_URI = 'http://localhost:3001/api/auth/callback/naver'

export const NAVER_AUTH_URL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NAVER_CLIENT_ID}&redirect_uri=${NAVER_REDIRECT_URI}`

const GOOGLE_CLIENT_ID = config.GOOGLE_CLIENT_ID
const GOOGLE_REDIRECT_URI = 'http://localhost:3001/api/auth/callback/google'

export const GOOGLE_AUTH_URL = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${GOOGLE_REDIRECT_URI}&scope=https://www.googleapis.com/auth/contacts.readonly`
