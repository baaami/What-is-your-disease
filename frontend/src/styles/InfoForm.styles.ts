import styled from 'styled-components'

export const FormContainer = styled.div`
  padding-top: 170px;

  & .sectionTitle {
    font-size: 22px;

    & .textGreen {
      color: #3c6d2e;
      font-size: 26px;
      font-weight: 900;
    }
  }
`

export const UserForm = styled.div`
  margin-top: 30px;

  & .formTitle {
    &.bottom {
      margin-top: 70px;
    }
    font-size: 22px;
    margin-bottom: 15px;
    & .important {
      font-size: 18px;
      color: #48a32f;
    }
    & .optional {
      font-size: 16px;
      color: #999999;
    }
  }

  & .submitButton {
    margin-top: 30px;
    background-color: #3c6d2e;
    color: white;
    font-size: 18px;
    font-weight: 700;
    padding: 10px 60px;
    border-radius: 20px;
  }
`
export const FormRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10%;
  margin-bottom: 20px;

  & input {
    border: 1px solid #828282;
    &#name {
      width: 360px;
    }
    &#age,
    &#gender {
      width: 150px;
    }
    &#blood_type {
      width: 102px;
    }
    &#allergy {
      width: 364px;
    }
    &#drug {
      width: 327px;
    }
  }
  & .label {
    width: 74px;
  }
`
