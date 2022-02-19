import * as React from 'react'
// import { useHistory } from 'react-router-dom'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import client from '../../../../lib/client'
import { useRecoilState } from 'recoil'
import { currentUserInfo } from 'store/userInfo'

interface KauthProps {}

export default function Kauth(props: KauthProps) {
  const router = useRouter()
  const [userInfo, setUserInfo] = useRecoilState(currentUserInfo)

  useEffect(() => {
    // 인가 코드
    // const code = new URL(window.location.pathname).searchParams.get("code");
    // console.log(router.asPath.split("code=")[1]);
    const code = router.asPath.split('code=')[1]

    client
      .post(`http://localhost:4000/api/auth/callback/kakao`, { code })
      .then((res) => {
        const { user, is_new, token } = res.data
        // 예시로 로컬에 저장
        localStorage.setItem('jwttoken', token) //예시로 로컬에 저장함

        // 첫번째 로그인 이라면
        if (is_new) {
          // 회원정보 입력 페이지로 이동
          setUserInfo({
            ...userInfo,
            ...user,
          })
          router.push('/infoForm')
        } else {
          setUserInfo({
            ...userInfo,
            ...user,
          })
          router.replace('/') // 토큰 받았았고 로그인됐으니 화면 전환시켜줌(메인으로)
        }
      })
      .catch((err) => {
        console.log('소셜로그인 에러', err)
        window.alert('로그인에 실패하였습니다.')
        router.replace('/login') // 로그인 실패하면 로그인화면으로 돌려보냄
      })
  }, [])

  return <div>kakao</div>
}
