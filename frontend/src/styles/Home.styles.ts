import styled from 'styled-components'

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
  padding: 70px 0 125px;
`
export const PopularPostBanner = styled.div`
  padding: 70px 0 125px;
`
export const LatestPostBanner = styled.div`
  padding: 70px 0 125px;
`
