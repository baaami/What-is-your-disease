export interface UserInfoModel {
  name: string
  age: number | string
  gender: string
  bloodtype?: string
  allergy?: Array<string>
  medicines?: Array<string>
}
