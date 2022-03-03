import React, { useState, useEffect } from 'react'
import {
  FormContainer,
  FormRow,
  ProfileForm,
  UserForm,
} from 'styles/InfoForm.styles'
import profileDefault from 'assets/img/profile.svg'
import Input from 'components/Input'
import API from 'service/api'
import { useRouter } from 'next/router'
import { useRecoilState } from 'recoil'
import { currentUserInfo } from 'store/userInfo'
import { Radio, RadioChangeEvent } from 'antd'
import { Container } from 'common.styles'

interface IInfoFormProps {}

export default function InfoForm(props: IInfoFormProps) {
  const router = useRouter()

  const [userInfo, setUserInfo] = useRecoilState(currentUserInfo)
  const { name, age, gender, nickname, bloodtype, allergy, medicines } =
    userInfo.info
  const [form_value, setFormValue] = useState({
    name: '',
    age: '',
    gender: '',
    nickname: '',
    bloodtype: '',
    allergy: '',
    medicines: '',
  })

  const [validation_error, setValidationError] = useState({
    name: true,
    age: true,
    gender: true,
    nickname: true,
  })

  const onChangeGender = (e: RadioChangeEvent) => {
    setFormValue({
      ...form_value,
      gender: e.target.value,
    })
  }

  const onChangeBloodTyle = (e: RadioChangeEvent) => {
    setFormValue({
      ...form_value,
      bloodtype: e.target.value,
    })
  }

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nextForm = {
      ...form_value,
      [e.target.name]: e.target.value,
    }

    setFormValue(nextForm)
  }

  const handleSubmitUserInfo = async () => {
    if (!checkValidation()) {
      return
    }

    const { name, age, gender, nickname, bloodtype, allergy, medicines } =
      form_value
    setUserInfo({
      ...userInfo,
      info: {
        name,
        age,
        gender,
        nickname,
        bloodtype,
        allergy: allergy.replaceAll(' ', '').split(','),
        medicines: medicines.replaceAll(' ', '').split(','),
      },
    })
    const req_data = {
      name,
      age,
      gender,
      nickname,
      bloodtype,
      allergy: allergy.replaceAll(' ', '').split(','),
      medicines: medicines.replaceAll(' ', '').split(','),
    }
    await API.auth
      .updateUserInfo(req_data)
      .then((res: any) => {
        alert('회원정보 등록에 성공하였습니다.')
        router.push('/mypage')
      })
      .catch((e) => {
        console.log(e)
        alert('회원정보 수정중 오류가 발생했습니다.')
      })
  }

  const checkValidation = () => {
    const { name, age, gender, nickname } = form_value
    let validation_trigger = true
    let validation_list = {
      name,
      age,
      gender,
      nickname,
    } as { [key: string]: string }

    let validation_res = {
      name: true,
      age: true,
      gender: true,
      nickname: true,
    } as { [key: string]: boolean }

    for (let [key, value] of Object.entries(validation_list)) {
      if (value === '' || value === undefined) {
        validation_trigger = false
        validation_res[key] = false
      }
    }

    setValidationError({
      ...validation_error,
      ...validation_res,
    })

    if (!validation_trigger) {
      return false
    } else {
      return true
    }
  }

  const mountSetForm = () => {
    setFormValue({
      ...form_value,
      name,
      age,
      gender,
      nickname,
      bloodtype,
      allergy: allergy.join(', '),
      medicines: medicines.join(', '),
    })
  }

  useEffect(() => {
    mountSetForm()
    window.scrollTo({ top: 0 })
  }, [])

  return (
    <FormContainer>
      <Container>
        <ProfileForm>
          <FormRow>
            <div className="profileWrap">
              <img
                src={profileDefault.src}
                className="profileImg"
                alt="프로필 사진"
                width="130px"
                height="130px"
              />
              <button className="profileButton">프로필 사진 업로드</button>
            </div>
          </FormRow>
          <FormRow>
            <div className="nicknameWrap">
              <Input
                id="nickname"
                type="text"
                name="nickname"
                value={form_value.nickname}
                onChange={handleFormChange}
                autoComplete="off"
                error={
                  !validation_error.nickname
                    ? '닉네임은 필수 입력사항입니다'
                    : undefined
                }
              />
              <button className="nicknameButton">완료</button>
            </div>
          </FormRow>
        </ProfileForm>
        <section className="sectionTitle">
          당신의 <span className="textGreen">건강</span>을 알기위한{' '}
          <span className="textGreen">정보</span>를 입력해주세요
        </section>
        <UserForm>
          <FormRow>
            <div className="label">이름</div>
            <div className="input">
              <Input
                id="name"
                type="text"
                name="name"
                value={form_value.name}
                onChange={handleFormChange}
                autoComplete="off"
                error={
                  !validation_error.name
                    ? '이름은 필수 입력사항입니다.'
                    : undefined
                }
              />
            </div>
          </FormRow>
          <FormRow>
            <div className="label">나이</div>
            <div className="input">
              <Input
                id="age"
                type="text"
                name="age"
                value={form_value.age}
                onChange={handleFormChange}
                autoComplete="off"
                error={
                  !validation_error.age
                    ? '나이는 필수 입력사항입니다.'
                    : undefined
                }
              />
            </div>
          </FormRow>
          <FormRow>
            <div className="label">성별</div>
            <div className="input">
              <Radio.Group
                onChange={(e) => {
                  onChangeGender(e)
                }}
                value={form_value.gender === '' ? '남자' : form_value.gender}
              >
                <Radio value={'남자'}>남자</Radio>
                <Radio value={'여자'}>여자</Radio>
              </Radio.Group>
            </div>
          </FormRow>
          <FormRow>
            <div className="label">혈액형</div>
            <div className="input">
              <Radio.Group
                onChange={(e) => {
                  onChangeBloodTyle(e)
                }}
                value={form_value.bloodtype === '' ? 'A' : form_value.bloodtype}
              >
                <Radio value={'A'}>A</Radio>
                <Radio value={'B'}>B</Radio>
                <Radio value={'O'}>O</Radio>
                <Radio value={'AB'}>AB</Radio>
              </Radio.Group>
            </div>
          </FormRow>
          <FormRow>
            <div className="label">알러지</div>
            <div className="input">
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
          <FormRow>
            <div className="label">복용중인 약</div>
            <div className="input">
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
          <div className="btnWrap">
            <button className="submitButton" onClick={handleSubmitUserInfo}>
              완료
            </button>
          </div>
        </UserForm>
      </Container>
    </FormContainer>
  )
}
