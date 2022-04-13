import styled from 'styled-components'

export const SignupWrapper = styled.div`
  padding-top: 170px;
  text-align: center;

  h2 {
    margin: 100px 0 50px;
    font-weight: 400;
    font-size: 24px;
  }
  div {
    margin-bottom: 200px;
  }
  button {
    margin: 0 15px;
    border-radius: 100%;

    img {
      border-radius: 100%;
      box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.2);
      transition: all 0.2s ease-in;

      &:hover {
        transform: translateY(-10%);
      }
    }
  }
`
