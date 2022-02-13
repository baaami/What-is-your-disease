import React from 'react'
import { useRecoilState } from 'recoil'
import { currentUserInfo } from 'store/userInfo'
import styled from 'styled-components'

interface InfoCardModel {
  name?: string
  age?: number | string
  gender?: string
  nickname?: string
  bloodtype?: string
  allergy?: string[]
  medicines?: string[]
}

const InfoCard = (props: InfoCardModel) => {
  const [userInfo, setUserInfo] = useRecoilState(currentUserInfo)

  const getArrayToJsx = (arr: Array<string>) => {
    if (!arr) return ''
    return arr.map((item, index) => {
      if (index === arr.length - 1) {
        return <span key={`infoCardId${index}`}>{item}</span>
      } else {
        return <span key={`infoCardId${index}`}>{item}, </span>
      }
    })
  }

  return (
    <InfoCardWrapper>
      <InfoCardWrap>
        <div className="col">
          <div className="row title">이름</div>
          <div className="row data">{props.name ?? ''}</div>
        </div>
        <div className="col">
          <div className="row title">나이</div>
          <div className="row data">{props.age ?? ''}</div>
        </div>
        <div className="col">
          <div className="row title">성별</div>
          <div className="row data">{props.gender ?? ''}</div>
        </div>
      </InfoCardWrap>
      <InfoCardWrap>
        <div className="col">
          <div className="row title">혈액형</div>
          <div className="row data">{props.bloodtype ?? ''}</div>
        </div>
        <div className="col">
          <div className="row title">알러지</div>
          <div className="row data">
            {getArrayToJsx(props.allergy as string[])}
          </div>
        </div>
        <div className="col">
          <div className="row title">복용중인 약</div>
          <div className="row data">
            {getArrayToJsx(props.medicines as string[])}
          </div>
        </div>
      </InfoCardWrap>
    </InfoCardWrapper>
  )
}

export default InfoCard

export const InfoCardWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 50px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 20px;
  }
`
export const InfoCardWrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 40px 25px;
  border-radius: 10px;
  border: 1px solid #828282;

  .col {
    display: flex;

    .title {
      width: 100px;
      font-size: 20px;
      margin-right: 54px;
    }
    .data {
      font-size: 18px;
    }

    &:last-of-type .title {
      margin-bottom: 0;
    }
  }
`
