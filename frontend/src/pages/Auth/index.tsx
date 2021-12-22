import * as React from 'react'
import { useHistory } from 'react-router-dom'
import client from '../../lib/client'
import { PopularPostBanner } from '../../styles/Home.styles'

interface AuthProps {}

export default function Auth(props: AuthProps) {
  const history = useHistory()

  console.log('get url')
  // 인가 코드
  const code = new URL(window.location.href).searchParams.get('code')

  console.log(code)

  client
    .post('/api/auth/callback/kakao', { code })
    .then(res => {
      console.log(res) // 넘어오는 토큰

      const access_token = res.data.accessToken

      // 예시로 로컬에 저장
      localStorage.setItem('token', access_token) //예시로 로컬에 저장함

      history.replace('/') // 토큰 받았았고 로그인됐으니 화면 전환시켜줌(메인으로)
    })
    .catch(err => {
      console.log('소셜로그인 에러', err)
      window.alert('로그인에 실패하였습니다.')
      history.replace('/login') // 로그인 실패하면 로그인화면으로 돌려보냄
    })

  return (
    <div>
      <PopularPostBanner className="wrap">
        <div className="title">인기 게시글</div>
      </PopularPostBanner>
      <h1>{code}</h1>
      <h1>check</h1>
    </div>
  )
}
