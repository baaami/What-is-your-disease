import React, { useEffect } from "react";
import { SignupWrapper } from "styles/Singup.styles";
import { useRouter } from "next/router";
import naver from "assets/img/naver_login.png";
import kakao from "assets/img/kakao_login.png";
import google from "assets/img/google_login.png";
import Image from "next/image";
import { KAKAO_AUTH_URL, NAVER_AUTH_URL, GOOGLE_AUTH_URL } from "lib/OAuth";

interface LoginProps {}

export default function Login(props: LoginProps) {
  const router = useRouter();
  const getKakaoCode = () => {
    // window.location.href = KAKAO_AUTH_URL;
    router.push(KAKAO_AUTH_URL);
  };

  const getNaverCode = () => {
    window.location.href = NAVER_AUTH_URL;
  };

  const getGoogleCode = () => {
    window.location.href = GOOGLE_AUTH_URL;
  };

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  return (
    <SignupWrapper className="wrap">
      <h2>SNS로 시작하기</h2>
      <div>
        <button onClick={getNaverCode}>
          <img src={naver.src} alt="네이버 로그인 아이콘" />
        </button>
        <button onClick={getKakaoCode}>
          <img src={kakao.src} alt="카카오 로그인 아이콘" />
        </button>
        <button onClick={getGoogleCode}>
          <img src={google.src} alt="구글 로그인 아이콘" />
        </button>
      </div>
    </SignupWrapper>
  );
}
