export interface UserInfoModel {
  name: string
  age: number | string
  gender: string
  nickname: string
  bloodtype?: string
  allergy?: Array<string>
  medicines?: Array<string>
}
