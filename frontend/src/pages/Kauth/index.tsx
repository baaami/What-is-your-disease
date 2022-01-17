import * as React from 'react'
import { useHistory } from 'react-router-dom'
import { useEffect } from 'react'
import client from '../../lib/client'
interface KauthProps {}

export default function Kauth(props: KauthProps) {
  const history = useHistory()

  useEffect(() => {
    // 인가 코드
    const code = new URL(window.location.href).searchParams.get('code')

    client
      .post('/api/auth/callback/kakao', { code })
      .then((res) => {
        console.log('Response Data : ', res.data) //예시로
        // 예시로 로컬에 저장
        localStorage.setItem('jwttoken', res.data.token) //예시로 로컬에 저장함
        const userInfo = res.data.user._doc
        delete userInfo.__v
        localStorage.setItem('userInfo', JSON.stringify(userInfo)) // 예시로 유저정보를 백엔드 유저 모델과 똑같이 로컬스토리지에 저장

        // 응답값에 필수 유저정보중에 하나라도 입력이 안되어 있다면
        if (
          res.data.user._doc.info.name === undefined ||
          !res.data.user._doc.info.age === undefined ||
          !res.data.user._doc.info.gender === undefined
        ) {
          // 회원정보 입력 페이지로 이동
          alert('로그인에 성공하였습니다. 회원 정보 입력 페이지로 이동합니다.')
          history.push('/infoForm')
        } else {
          history.replace('/') // 토큰 받았았고 로그인됐으니 화면 전환시켜줌(메인으로)
        }
      })
      .catch((err) => {
        console.log('소셜로그인 에러', err)
        window.alert('로그인에 실패하였습니다.')
        history.replace('/login') // 로그인 실패하면 로그인화면으로 돌려보냄
      })
  })

  return <div></div>
}
