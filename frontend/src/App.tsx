import * as React from 'react'
import Header from './layout/Header'
import Footer from './layout/Footer'
import 'antd/dist/antd.css';
import 'swiper/css';

export default class App extends React.Component {
  children: any

  public render() {
    return (
      <>
        <Header />
        {this.children}
        <Footer />
      </>
    )
  }
}
