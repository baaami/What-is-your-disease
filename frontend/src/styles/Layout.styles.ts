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
    .rightArea {
      .headerTxt {
        color: #333;
        font-size: 20px;
        text-decoration: none;
        margin: 0 10px;
        &:hover {
          color: #3c6d2e;
        }
      }
    }
  }
`
export const FooterContainer = styled.div`
  margin-top: 140px;
  padding: 80px 0;
  border-top: 1px solid #555;

  .imgContainer {
    margin-bottom: 35px;
  }
  .descript {
    margin-bottom: 20px;
    font-size: 20px;
    color: #555;
  }
  .snsContainer {
    display: flex;
    justify-content: end;
    align-items: center;
    margin-top: 84px;

    .name {
      font-size: 24px;
    }
    .jihyun {
      margin-left: 20px;
    }

    .snsIconContainer {
      margin-left: 25px;

      img {
        margin-right: 15px;
      }
    }
  }
`
