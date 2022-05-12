import styled from 'styled-components'

export const HeaderContainer = styled.div`
  position: sticky;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 100;

  &.sub {
    background: #fff;
    border-bottom: 1px solid #ccc;
  }

  .flexWrap {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 80px;

    .logo {
      position: relative;
      left: -40px;
      width: 160px;
      cursor: pointer;
    }
  }
  .menu-trigger {
    display: inline-block;
    position: relative;
    width: 25px;
    height: 40px;
    transition: all 0.4s;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 5px;
    span {
      display: inline-block;
      transition: all 0.4s;
      left: 0;
      width: 100%;
      height: 5px;
      background-color: #333;
      border-radius: 4px;
    }

    &.active {
      & span:nth-of-type(1) {
        -webkit-transform: translateY (20px) rotate (-45deg);
        transform: translateY(10px) rotate(-45deg);
      }
      & span:nth-of-type(2) {
        opacity: 0;
      }
      & span:nth-of-type(3) {
        -webkit-transform: translateY(-20px) rotate(45deg);
        transform: translateY(-10px) rotate(45deg);
      }
    }
  }
`
export const ContainerWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;
`
export const ProfileContainer = styled.div`
  a,
  button {
    /* transition: all 0.3s ease-in;

    &:hover {
      transform: translateY(-10%);
    } */

    img {
      width: 55px;
    }
  }
`
export const ProfileModal = styled.div`
  position: absolute;
  right: 20px;
  color: white;
  padding: 30px;
  width: 380px;
  height: 240px;
  background-color: rgba(85, 85, 85);
  border-radius: 4px;
  transition: all 0.21s;
  opacity: 0;
  visibility: hidden;
  transform: translateY(-10px);

  &.vis {
    visibility: visible;
    opacity: 1;
    transform: translateY(3px);
  }
  .profileWrap {
    display: flex;
    gap: 18px;

    .nickname {
      font-size: 24px;
      font-weight: 900;
    }

    .buttonWrap {
      button {
        font-size: 15px;
        text-decoration: underline !important;
      }
    }
  }
  .modalLink {
    button {
      display: inline-block;
      margin-top: 25px;
      font-size: 18px;
      cursor: pointer;
    }
  }
`

export const InfoCardContainer = styled.div`
  display: flex;
  align-items: center;

  @media (max-width: 570px) {
    margin-bottom: 10px;
  }

  .name {
    margin-bottom: 0;
    font-size: 18px;
    font-weight: 500;

    @media (max-width: 768px) {
      font-size: 15px;
    }
  }

  .snsIconContainer {
    margin: 0 8px;

    img {
      margin-right: 10px;
    }
  }
`
export const FooterContainer = styled.div`
  padding: 40px 0;
  border-top: 1px solid #555;

  .logo {
    position: relative;
    left: -30px;
    margin-bottom: 30px;
  }
`
export const Descript = styled.h2`
  font-size: 16px;
  font-weight: 400;
  margin-bottom: 20px;
`
export const SnsContainer = styled.div`
  display: flex;
  justify-content: end;
`

export const HeaderModal = styled.div`
  position: absolute;
  right: -20px;
  color: white;
  padding: 30px;
  width: 380px;
  height: 240px;
  background-color: rgba(85, 85, 85);
  border-radius: 4px;
  transition: all 0.21s;
  opacity: 0;
  visibility: hidden;
  transform: translateY(-10px);
  z-index: 101;

  &.vis {
    visibility: visible;
    opacity: 1;
    transform: translateY(3px);
  }
  .profileWrap {
    display: flex;
    gap: 18px;

    .nickname {
      font-size: 24px;
      font-weight: 900;
    }

    .buttonWrap {
      button {
        font-size: 15px;
        text-decoration: underline !important;
      }
    }
  }
  .modalLink {
    button {
      display: inline-block;
      margin-top: 25px;
      font-size: 18px;
      cursor: pointer;
    }
  }
`
