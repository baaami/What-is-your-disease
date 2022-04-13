import styled from 'styled-components'

export const Container = styled.div`
  position: relative;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 1200px) {
    padding: 0 30px;
  }
  @media (max-width: 414px) {
    padding: 0 15px;
  }
`
export const Title = styled.div`
  margin-bottom: 40px;
  font-size: 26px;
  font-weight: 500;

  @media (max-width: 414px) {
    font-size: 22px;
  }
  @media (max-width: 320px) {
    font-size: 18px;
  }
`
export const NoData = styled.div`
  text-align: center;
  font-size: 18px;
  margin-top: 60px;
`
