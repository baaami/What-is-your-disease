import React, { useState, useEffect } from 'react'
import { FormContainer, FormRow, UserForm } from 'styles/InfoForm.styles'
import Input from 'components/Input'
import API from 'service/api'
import { useHistory } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import { currentUserInfo } from 'store/userInfo'
interface IInfoFormProps {}

export default function InfoForm(props: IInfoFormProps) {
  const history = useHistory()

  const [userInfo, setUserInfo] = useRecoilState(currentUserInfo)
  const { name, age, gender, bloodtype, allergy, medicines } = userInfo.info
  const [form_value, setFormValue] = useState({
    name: '',
    age: '',
    gender: '',
    bloodtype: '',
    allergy: '',
    medicines: '',
  })

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nextForm = {
      ...form_value,
      [e.target.name]: e.target.value,
    }

    setFormValue(nextForm)
  }

  const handleSubmitUserInfo = async () => {
    const { name, age, gender, bloodtype, allergy, medicines } = form_value
    setUserInfo({
      ...userInfo,
      info: {
        name,
        age,
        gender,
        bloodtype,
        allergy: allergy.replaceAll(' ', '').split(','),
        medicines: medicines.replaceAll(' ', '').split(','),
      },
    })
    const req_data = {
      name,
      age,
      gender,
      bloodtype,
      allergy: allergy.replaceAll(' ', '').split(','),
      medicines: medicines.replaceAll(' ', '').split(','),
    }
    await API.auth
      .updateUserInfo(req_data)
      .then((res: any) => {
        alert('회원정보 수정에 성공하였습니다.')
        history.push('/mypage')
      })
      .catch((e) => {
        console.log(e)
        alert('회원정보 수정중 오류가 발생했습니다.')
      })
  }

  const mountSetForm = () => {
    setFormValue({
      ...form_value,
      name,
      age,
      gender,
      bloodtype,
      allergy: allergy.join(', '),
      medicines: medicines.join(', '),
    })
  }

  useEffect(() => {
    mountSetForm()
  }, [])

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
              id="bloodtype"
              type="text"
              name="bloodtype"
              value={form_value.bloodtype}
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
              id="medicines"
              type="text"
              name="medicines"
              value={form_value.medicines}
              onChange={handleFormChange}
              autoComplete="off"
            />
          </div>
        </FormRow>
        <button className="submitButton" onClick={handleSubmitUserInfo}>
          입력 완료
        </button>
      </UserForm>
    </FormContainer>
  )
}
