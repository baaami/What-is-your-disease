import styled from 'styled-components'
import blueBanner from '../assets/img/blueBanner.jpg'

export const HomeContainer = styled.div`
  padding-top: 170px;

  @media (max-width: 768px) {
    padding-top: 125px;
  }
`
export const CategoryBanner = styled.div`
  padding: 70px 0 0;

  @media (max-width: 768px) {
    padding: 40px 0 95px;
  }

  .categoryItemContainer {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    @media (max-width: 500px) {
      flex-direction: column;
    }

    .categoryItem {
      width: 26%;
      margin-bottom: 120px;
      cursor: pointer;

      @media (max-width: 768px) {
        margin-bottom: 80px;
      }

      @media (max-width: 500px) {
        width: 100%;
        margin-bottom: 0;
      }

      &:nth-of-type(4),
      &:nth-of-type(8) {
        width: 150px;

        @media (max-width: 768px) {
          width: 100px;
        }
        @media (max-width: 500px) {
          width: 100%;
        }
      }

      &:first-of-type .categoryItemWrap {
        padding-top: 0;
      }
      &:last-of-type .categoryItemWrap {
        border: none;
        padding-bottom: 0;
      }

      .categoryItemWrap {
        width: 150px;

        @media (max-width: 768px) {
          width: 100px;
        }

        @media (max-width: 500px) {
          display: flex;
          align-items: center;
          width: 100%;
          padding: 25px 0;
          border-bottom: 1px solid #ccc;
        }
      }

      img {
        transition: transform 0.8s;
        transform-style: preserve-3d;
        box-shadow: 0px 13px 9px -11px rgba(0, 0, 0, 0.2);

        @media (max-width: 768px) {
          width: 100px;
        }

        @media (max-width: 500px) {
          width: 70px;
        }
      }

      h2 {
        margin-top: 18px;
        text-align: center;
        font-size: 30px;
        font-weight: normal;

        @media (max-width: 768px) {
          font-size: 26px;
        }
        @media (max-width: 500px) {
          margin-top: 0;
          margin-left: 20px;
          font-size: 20px;
        }
      }

      &:hover img {
        transform: rotateY(180deg);
      }
    }
  }
`
export const BlueBannerWrapper = styled.div`
  position: relative;
`
export const DarkBg = styled.div`
  display: none;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #000;

  @media (max-width: 414px) {
    display: block;
  }
`
export const BlueBannerBg = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url(${blueBanner}) no-repeat center;
  background-size: contain;
  background-color: #2a7efc;

  @media (max-width: 414px) {
    opacity: 0.75;
  }
`
export const BlueBanner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 350px;

  @media (max-width: 1014px) {
    height: 200px;
  }

  h3 {
    margin-bottom: 40px;
    font-size: 34px;
    font-weight: 900;
    color: #fff;
    z-index: 1;

    @media (max-width: 1014px) {
      margin-bottom: 20px;
      font-size: 25px;
    }

    @media (max-width: 414px) {
      margin-bottom: 15px;
      font-size: 20px;
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
    z-index: 1;

    @media (max-width: 1014px) {
      width: 200px;
      height: 45px;
      line-height: 45px;
      font-size: 18px;
    }

    @media (max-width: 414px) {
      width: 160px;
      height: 35px;
      line-height: 35px;
      font-size: 14px;
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
