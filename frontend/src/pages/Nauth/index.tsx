import * as React from 'react'
import { useHistory } from 'react-router-dom'
import { useEffect } from 'react'
import client from '../../lib/client'

interface NauthProps {}

export default function Nauth(props: NauthProps) {
  const history = useHistory()

  useEffect(() => {
    // 인가 코드
    const code = new URL(window.location.href).searchParams.get('code')

    console.log(
      '[TEST] searchParams : ',
      new URL(window.location.href).searchParams
    )
    console.log('[TEST] code : ', code)

    client
      .post('/api/auth/callback/naver', { code })
      .then(res => {
        console.log('Response Data : ', res.data) //예시로
        // 예시로 로컬에 저장
        localStorage.setItem('jwttoken', res.data.token) //예시로 로컬에 저장함
        window.alert('로그인에 성공하였습니다.')
        history.replace('/') // 토큰 받았았고 로그인됐으니 화면 전환시켜줌(메인으로)
      })
      .catch(err => {
        console.log('소셜로그인 에러', err)
        window.alert('로그인에 실패하였습니다.')
        history.replace('/login') // 로그인 실패하면 로그인화면으로 돌려보냄
      })
  })

  return <div></div>
}
