import styled from 'styled-components'

export const HeaderContainer = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  z-index: 99;
  width: 100%;
  height: 110px;
  background: #fff;
  box-shadow: 0px 13px 9px -11px rgb(230 230 230 / 54%);

  @media (max-width: 768px) {
    height: 85px;
  }

  .wrap {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 110px;

    @media (max-width: 768px) {
      height: 85px;
    }

    img {
      @media (max-width: 768px) {
        width: 150px;
      }
      @media (max-width: 414px) {
        width: 110px;
      }
    }
    .rightArea {
      .headerTxt {
        color: #333;
        font-size: 20px;
        text-decoration: none;
        margin: 0 10px;

        @media (max-width: 768px) {
          font-size: 16px;
        }
        @media (max-width: 414px) {
          font-size: 14px;
        }

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

  @media (max-width: 768px) {
    padding: 40px 0;
  }

  .imgContainer {
    margin-bottom: 35px;

    img {
      @media (max-width: 768px) {
        width: 150px;
      }
    }
  }

  .descript {
    margin-bottom: 20px;
    font-size: 20px;
    color: #555;

    @media (max-width: 768px) {
      margin-bottom: 10px;
      font-size: 15px;
    }
  }
  .snsContainer {
    display: flex;
    justify-content: end;
    align-items: center;
    margin-top: 84px;

    @media (max-width: 768px) {
      margin-top: 30px;
    }

    @media (max-width: 570px) {
      flex-direction: column;
      justify-content: center;
      align-items: start;
    }

    .infoCardWrap {
      display: flex;
      align-items: center;

      @media (max-width: 570px) {
        margin-bottom: 10px;
      }
    }

    .name {
      font-size: 24px;

      @media (max-width: 768px) {
        font-size: 18px;
      }
    }

    .snsIconContainer {
      margin: 0 8px;

      img {
        width: 35px;
        margin-right: 10px;

        @media (max-width: 768px) {
          width: 28px;
        }
      }
    }
  }
`
