import styled from 'styled-components'
import blueBanner from '../assets/img/blueBanner.jpg'

export const HomeContainer = styled.div`
  padding-top: 170px;

  @media (max-width: 768px) {
    padding-top: 125px;
  }
`
export const CategoryBanner = styled.div`
  padding: 70px 0 125px;

  @media (max-width: 768px) {
    padding: 40px 0 95px;
  }

  .categoryItemContainer {
    display: flex;
    flex-wrap: wrap;
    gap: 120px 14.8%;

    img {
      transition: transform 0.8s;
      transform-style: preserve-3d;
      box-shadow: 0px 13px 9px -11px rgba(0, 0, 0, 0.2);
    }

    .categoryItem {
      cursor: pointer;

      h2 {
        margin-top: 18px;
        text-align: center;
        font-size: 30px;
        font-weight: normal;
      }

      &:hover img {
        transform: rotateY(180deg);
      }
    }
  }
`
export const BlueBanner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 350px;
  background: url(${blueBanner}) no-repeat center;
  background-size: contain;
  background-color: #2a7efc;

  @media (max-width: 1014px) {
    height: 200px;
  }

  h3 {
    margin-bottom: 40px;
    font-size: 34px;
    font-weight: 900;
    color: #fff;

    @media (max-width: 1014px) {
      margin-bottom: 20px;
      font-size: 25px;
    }
  }

  a {
    width: 400px;
    height: 65px;
    background: #fff;
    border-radius: 65px;
    line-height: 64px;
    text-align: center;
    font-size: 28px;
    font-weight: 500;
    color: #1850a3;
    transition: all 0.2s ease-in;

    @media (max-width: 1014px) {
      width: 200px;
      height: 45px;
      line-height: 45px;
      font-size: 18px;
    }

    &:hover {
      background: #1850a3;
      color: #fff;
    }
  }
`
export const PopularPostBanner = styled.div`
  padding: 70px 0 125px;

  @media (max-width: 768px) {
    padding: 40px 0 95px;
  }

  .popularPostContainer {
    display: flex;
    justify-content: space-between;

    @media (max-width: 768px) {
      flex-direction: column;
    }

    .popularPost {
      position: relative;
      width: 320px;
      height: 432px;
      background: #fff;
      border: 1px solid #ccc;
      border-radius: 8px;

      @media (max-width: 1014px) {
        width: 260px;
        height: 320px;
        margin-bottom: 35px;
      }

      @media (max-width: 768px) {
        width: 100%;
        height: auto;
      }

      img {
        position: absolute;
        right: 34px;

        @media (max-width: 1014px) {
          right: 15px;
        }
      }
      h2 {
        margin: 50px 30px;
        font-size: 22px;
        font-weight: 400;

        @media (max-width: 1014px) {
          margin: 50px 15px 20px;
          font-size: 20px;
        }
        @media (max-width: 768px) {
          margin: 15px;
          font-size: 17px;
        }
      }
      h3 {
        margin: 0 30px;
        font-size: 22px;
        font-weight: 400;
        color: #111;

        @media (max-width: 1014px) {
          margin: 10px 15px;
          font-size: 20px;
        }
        @media (max-width: 768px) {
          margin: 0 15px;
          font-size: 18px;
        }
      }
      p {
        display: -webkit-box;
        word-wrap: break-word;
        -webkit-line-clamp: 5;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
        height: 125px;
        line-height: 24px;
        margin: 35px 30px 40px;
        font-size: 18px;
        color: #333;

        @media (max-width: 1014px) {
          margin: 15px;
          font-size: 15px;
        }
        @media (max-width: 768px) {
          height: 55px;
          line-height: 20px;
          font-size: 14px;
        }
      }
      h4 {
        margin: 0 30px;
        text-align: end;
        font-size: 16px;
        font-weight: 400;

        @media (max-width: 1014px) {
          font-size: 14px;
        }
        @media (max-width: 768px) {
          font-size: 12px;
          margin-bottom: 15px;
        }
      }
    }
  }
`
export const LatestPostBanner = styled.div`
  position: relative;
  padding: 70px 0 125px;

  @media (max-width: 768px) {
    padding: 40px 0 95px;
  }

  @keyframes arrowShaking {
    0% {
      transform: translateX(0);
    }

    50% {
      transform: translateX(8px);
    }

    100% {
      transform: translateX(0);
    }
  }

  .viewMoreBtn {
    position: absolute;
    top: 80px;
    right: 0;
    font-size: 20px;
    color: #666;

    &:hover {
      color: #000;
    }
  }
  .latestPostContainer {
    .latestPost {
      display: flex;
      justify-content: space-between;
      align-items: center;
      line-height: 80px;
      padding: 0 25px;

      .postTitle {
        font-size: 22px;
        color: #333;
      }
      img {
        position: relative;
        right: 10px;
        height: 18px;
        transition: all 0.3s ease-in;
      }

      &:nth-of-type(2n + 1) {
        background: #f4f4f4;
      }

      &:hover img {
        animation: arrowShaking 1.5s infinite;
      }
    }
  }
`
