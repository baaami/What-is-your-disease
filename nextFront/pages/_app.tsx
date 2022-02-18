import "../stylesG/globals.css";
import { useRouter } from "next/router";
import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";
import Footer from "layout/Footer";
import "antd/dist/antd.css";
import "swiper/css";
import HomeHeader from "layout/HomeHeader";
import SubHeader from "layout/SubHeader";

function MyApp({ Component, pageProps }: AppProps) {
  const location = useRouter();
  return (
    <RecoilRoot>
      {location.pathname === "/" ? <HomeHeader /> : <SubHeader />}
      <Component {...pageProps} />
      <Footer />
    </RecoilRoot>
  );
}

export default MyApp;
