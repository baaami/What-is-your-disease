import styled from 'styled-components'

export const HeaderContainer = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  z-index: 99;
  width: 100%;
  height: 125px;
  background: #fff;
  box-shadow: 0px 13px 9px -11px rgb(230 230 230 / 54%);

  .wrap {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 125px;

    .signupTxt {
      color: #333;
      font-size: 20px;
      text-decoration: none;

      &:hover {
        color: #3c6d2e;
      }
    }
  }
`
