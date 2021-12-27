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
    box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.2);
    transition: all 0.2s ease-in;

    &:hover {
      background: #1850a3;
      color: #fff;
    }
  }
`
export const PopularPostBanner = styled.div`
  padding: 70px 0 125px;
`
export const LatestPostBanner = styled.div`
  padding: 70px 0 125px;
`
