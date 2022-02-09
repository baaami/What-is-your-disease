import * as React from 'react'
import { useLocation } from 'react-router-dom'
import Footer from './layout/Footer'
import 'antd/dist/antd.css';
import 'swiper/css';
import HomeHeader from './layout/HomeHeader'
import SubHeader from './layout/SubHeader'


type Props = {
  children?: React.ReactNode;
};

export default function App({children}: Props) { 
  const location = useLocation()

  return (
    <>
      {location.pathname === "/" ? <HomeHeader/> : <SubHeader/>}
      {children}
      <Footer/>
    </>
  )
  
}
