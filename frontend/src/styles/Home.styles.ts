import styled from 'styled-components'
import blueBanner from '../assets/img/blueBanner.jpg'

export const HomeContainer = styled.div`
  padding-top: 170px;
`
export const CategoryBanner = styled.div`
  padding: 70px 0 125px;

  .categoryItemContainer {
    display: flex;
    flex-wrap: wrap;
    gap: 150px 14.8%;

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

  h3 {
    margin-bottom: 40px;
    font-size: 34px;
    font-weight: 900;
    color: #fff;
  }
  button {
    width: 400px;
    height: 65px;
    background: #fff;
    border-radius: 65px;
    font-size: 28px;
    font-weight: 500;
    color: #1850a3;
    transition: all 0.2s ease-in;

    &:hover {
      background: #1850a3;
      color: #fff;
    }
  }
`
export const PopularPostBanner = styled.div`
  padding: 70px 0 125px;

  .popularPostContainer {
    display: flex;
    justify-content: space-between;

    .popularPost {
      position: relative;
      width: 320px;
      height: 432px;
      background: #fff;
      border: 1px solid #ccc;
      border-radius: 8px;

      img {
        position: absolute;
        right: 34px;
      }
    }
  }
`
export const LatestPostBanner = styled.div`
  position: relative;
  padding: 70px 0 125px;

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
`
