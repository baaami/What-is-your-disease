import React, { useState } from 'react'
import { FormContainer, FormRow, UserForm } from 'styles/InfoForm.styles'
import Input from 'components/Input'
interface IInfoFormProps {}

export default function InfoForm(props: IInfoFormProps) {
  const [form_value, setFormValue] = useState({
    name: '',
    age: '',
    gender: '',
    blood_type: '',
    allergy: '',
    drug: '',
  })

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nextForm = {
      ...form_value,
      [e.target.name]: e.target.value,
    }

    setFormValue(nextForm)
  }

  return (
    <FormContainer className="wrap">
      <section className="sectionTitle">
        당신의 <span className="textGreen">건강</span>을 알기위한{' '}
        <span className="textGreen">정보</span>를 입력해주세요
      </section>
      <UserForm>
        <div className="formTitle">
          최소 정보 <span className="important">(필수)</span>
        </div>
        <FormRow className="formRow">
          <div className="label">이름</div>
          <div>
            <Input
              id="name"
              type="text"
              name="name"
              value={form_value.name}
              onChange={handleFormChange}
              autoComplete="off"
            />
          </div>
        </FormRow>
        <FormRow className="formRow">
          <div className="label">나이</div>
          <div>
            <Input
              id="age"
              type="text"
              name="age"
              value={form_value.age}
              onChange={handleFormChange}
              autoComplete="off"
            />
          </div>
        </FormRow>
        <FormRow className="formRow">
          <div className="label">성별</div>
          <div>
            <Input
              id="gender"
              type="text"
              name="gender"
              value={form_value.gender}
              onChange={handleFormChange}
              autoComplete="off"
            />
          </div>
        </FormRow>

        <div className="formTitle bottom">
          추가 정보 <span className="optional">(선택)</span>
        </div>
        <FormRow className="formRow">
          <div className="label">혈액형</div>
          <div>
            <Input
              id="blood_type"
              type="text"
              name="blood_type"
              value={form_value.blood_type}
              onChange={handleFormChange}
              autoComplete="off"
            />
          </div>
        </FormRow>
        <FormRow className="formRow">
          <div className="label">알러지</div>
          <div>
            <Input
              id="allergy"
              type="text"
              name="allergy"
              value={form_value.allergy}
              onChange={handleFormChange}
              autoComplete="off"
            />
          </div>
        </FormRow>
        <FormRow className="formRow">
          <div className="label">복용중인 약</div>
          <div>
            <Input
              id="drug"
              type="text"
              name="drug"
              value={form_value.drug}
              onChange={handleFormChange}
              autoComplete="off"
            />
          </div>
        </FormRow>
        <button className="submitButton">입력 완료</button>
      </UserForm>
    </FormContainer>
  )
}
