import * as React from 'react'
import { SignupWrapper } from '../../styles/Singup.styles'
import naver from '../../assets/img/naver_login.png'
import kakao from '../../assets/img/kakao_login.png'
import google from '../../assets/img/google_login.png'
import {
  KAKAO_AUTH_URL,
  NAVER_AUTH_URL,
  GOOGLE_AUTH_URL,
} from '../../lib/OAuth'

interface ISignupProps {}

export default function Signup(props: ISignupProps) {
  const getKakaoCode = () => {
    window.location.href = KAKAO_AUTH_URL
  }

  const getNaverCode = () => {
    window.location.href = NAVER_AUTH_URL
  }

  const getGoogleCode = () => {
    window.location.href = GOOGLE_AUTH_URL
  }

  return (
    <SignupWrapper className="wrap">
      <h2>SNS로 시작하기</h2>
      <div>
        <button onClick={getNaverCode}>
          <img src={naver} alt="네이버 로그인 아이콘" />
        </button>
        <button onClick={getKakaoCode}>
          <img src={kakao} alt="카카오 로그인 아이콘" />
        </button>
        <button onClick={getGoogleCode}>
          <img src={google} alt="구글 로그인 아이콘" />
        </button>
      </div>
    </SignupWrapper>
  )
}
