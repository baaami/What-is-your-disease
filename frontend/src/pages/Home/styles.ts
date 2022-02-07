import styled from 'styled-components'
import mainBanner from '../../assets/img/mainBanner.svg'
import next from '../../assets/img/arrow_next.svg'
import nextActive from '../../assets/img/arrow_next_active.svg'
import prev from '../../assets/img/arrow_prev.svg'
import prevActive from '../../assets/img/arrow_prev_active.svg'

export const HomeContainer = styled.div``
export const MainBanner = styled.div`
  width: 100%;
  height: 750px;
  padding: 300px 0;
  background: url(${mainBanner}) no-repeat center;
  background-size: cover;

  h2{
    margin-bottom: 30px;
    text-align: center;
    font-size: 38px;
    font-weight: 900;
    color: #1850A3;
  }

  a{
    display: block;
    width: 250px;
    height: 65px;
    margin: 0 auto;
    text-align: center;
    line-height: 65px;
    background: #1850A3;
    border-radius: 4px;
    font-size: 24px;
    font-weight: 900;
    color: #fff;
    transition: all 0.3s ease-in;

    &:hover{
      background: #fff;
      border: 1px solid #1850A3;
      color: #1850A3;
    }
  }
`
export const Category = styled.div`
  margin-top: 90px;

  .category{
    display: flex;
    flex-wrap: wrap;

    .categoryItem{
      width: calc(100% / 6);
      border: 1px solid #C4C4C4;
      cursor: pointer;

      &:hover{
        background: #1850A3;
      }
      &:hover h2{
        color: #fff;
      }

      h2{
        padding: 8px 0;
        margin-bottom: 0;
        text-align: center;
        font-size: 20px;
        font-weight: 600;
      }
    }
  }
  
`
export const HotTopic = styled.div`
  position: relative;
  margin-top: 110px;

  .ant-carousel{
    width: 321px;
  }

  .swiper{
    padding-top: 60px;

    .swiper-button-prev{
      position: absolute;
      top: 0;
      right: 48px;
      width: 48px;
      height: 48px;
      background: url(${prev}) no-repeat center;
      border: 1px solid #444;
      cursor: pointer;

      &:hover{
        background: url(${prevActive}) no-repeat center;
        background-color: #1850A3;
      }
    }
    .swiper-button-next{
      position: absolute;
      top: 0;
      right: 0;
      width: 48px;
      height: 48px;
      background: url(${next}) no-repeat center;
      border: 1px solid #444;
      cursor: pointer;

      &:hover{
        background: url(${nextActive}) no-repeat center;
        background-color: #1850A3;
      }
    }
  }

  .descript{
    width: 321px;
    padding: 10px 15px;
    background: #1850A3;

    h2{
      font-size: 16px;
      font-weight: 600;
      color: #fff; 
    }
    h3{
      width: 280px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      font-size: 18px;
      color: #fff;
    }
    h4{
      text-align: end;
      font-size: 16px;
      color: #fff;

      span{
        margin-left: 10px;
        font-size: 15px;
        font-weight: 400;
      }
    }
  }
`
export const Post = styled.div`
  margin-top: 110px;
  margin-bottom: 250px;
`