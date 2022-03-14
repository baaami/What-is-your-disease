import styled from 'styled-components'
import mainBanner from 'assets/img/mainBanner.svg'
import next from 'assets/img/arrow_next.svg'
import nextActive from 'assets/img/arrow_next_active.svg'
import prev from 'assets/img/arrow_prev.svg'
import prevActive from 'assets/img/arrow_prev_active.svg'

export const HomeContainer = styled.div``
export const MainBanner = styled.div`
  width: 100%;
  height: 750px;
  padding: 300px 0;
  background: url(${mainBanner.src}) no-repeat center;
  background-size: cover;

  @media (max-width: 530px) {
    height: 500px;
    padding: 200px 0;
  }

  h2 {
    margin-bottom: 30px;
    text-align: center;
    font-size: 38px;
    font-weight: 900;
    color: #1850a3;

    @media (max-width: 530px) {
      font-size: 28px;
    }
  }

  a {
    display: block;
    width: 250px;
    height: 65px;
    margin: 0 auto;
    text-align: center;
    line-height: 65px;
    background: #1850a3;
    border-radius: 4px;
    font-size: 24px;
    font-weight: 900;
    color: #fff;
    transition: all 0.3s ease-in;

    @media (max-width: 530px) {
      width: 220px;
      height: 55px;
      line-height: 55px;
      font-size: 20px;
    }

    &:hover {
      background: #fff;
      border: 1px solid #1850a3;
      color: #1850a3;
    }
  }
`
export const Category = styled.div`
  margin-top: 90px;

  .category {
    display: flex;
    flex-wrap: wrap;

    .categoryItem {
      width: calc(100% / 6);
      border: 1px solid #c4c4c4;
      cursor: pointer;

      @media (max-width: 755px) {
        width: calc(100% / 4);
      }
      @media (max-width: 565px) {
        width: calc(100% / 2);
      }

      &:hover {
        background: #1850a3;
      }
      &:hover h2 {
        color: #fff;
      }

      h2 {
        padding: 8px 0;
        margin-bottom: 0;
        text-align: center;
        font-size: 20px;
        font-weight: 700;

        @media (max-width: 414px) {
          font-size: 16px;
        }
      }
    }
  }
`
export const HotTopic = styled.div`
  position: relative;
  margin-top: 110px;

  .swiper {
    padding-top: 60px;
    padding-left: 5px;
    height: 440px;
    .swiper-slide {
      position: relative;
    }

    .swiper-button-prev {
      position: absolute;
      top: 0;
      right: 48px;
      width: 48px;
      height: 48px;
      background: url(${prev.src}) no-repeat center;
      border: 1px solid #444;
      cursor: pointer;

      &:hover {
        background: url(${prevActive.src}) no-repeat center;
        background-color: #1850a3;
      }
    }
    .swiper-button-next {
      position: absolute;
      top: 0;
      right: 0;
      width: 48px;
      height: 48px;
      background: url(${next.src}) no-repeat center;
      border: 1px solid #444;
      cursor: pointer;

      &:hover {
        background: url(${nextActive.src}) no-repeat center;
        background-color: #1850a3;
      }
    }
  }

  .slideBox {
    width: 100%;
    padding: 35px 20px;
    background: #fff;
    /* box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, 0.05); */
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    border: 1px solid #f4f4f4;
    border-radius: 8px;
    cursor: pointer;

    .rankingImg {
      position: absolute;
      right: 20px;
      top: 0;
    }
    h2 {
      margin-bottom: 0;
      border-radius: 50px;
      font-size: 22px;
      font-weight: 700;
    }
    .likes {
      margin-bottom: 10px;
      font-size: 14px;
      color: #545454;

      span {
        padding-left: 2px;
        padding-right: 5px;
      }
    }
    h3 {
      width: 200px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      font-size: 18px;
      font-weight: 500;
    }
    p {
      display: -webkit-box;
      word-wrap: break-word;
      -webkit-line-clamp: 7;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
      line-height: 1.5;
      height: 155px;
      font-size: 15px;
    }
    h4 {
      margin-bottom: 0;
      text-align: end;
      font-size: 15px;
      font-weight: 400;
    }
  }
`
export const Post = styled.div`
  margin-top: 110px;
  margin-bottom: 100px;
`
