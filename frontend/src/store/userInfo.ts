import { atom, AtomOptions } from 'recoil'
import { PostUserModel } from 'service/model/postModel'

export const currentUserInfo = atom({
  key: 'currentUserInfo',
  default: {
    provider: '',
    providerId: '',
    _id: '',
    info: {
      name: '',
      age: '',
      gender: '',
      bloodtype: '',
      allergy: [],
      medicines: [],
    },
  },
})
