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
      nickname: '',
      bloodtype: '',
      allergy: [] as string[],
      medicines: [] as string[],
    },
    followerIds: [] as string[],
    followingIds: [] as string[],
  },
})
