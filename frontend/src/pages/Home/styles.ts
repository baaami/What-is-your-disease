import styled from 'styled-components'
import mainBanner from '../../assets/img/mainBanner.svg'

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
        text-align: center;
        font-size: 20px;
        font-weight: 600;
      }
    }
  }
  
`
export const HotTopic = styled.div`
  margin-top: 110px;
`
export const Post = styled.div`
  margin-top: 110px;
  margin-bottom: 250px;
`