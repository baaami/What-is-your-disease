import { atom } from 'recoil'

interface PushListsModel {
  _id: string
  sender: string
  receiver: string
  type: 'post' | 'comment' | 'reply' | 'follow' | 'like'
  Info: {
    senderId: string
    postId: string
    commentId: string
  }
  confirm: boolean
  publishedDate: string
}

export const pushListInit = atom<PushListsModel[]>({
  key: 'pushListData',
  default: [] as PushListsModel[],
})
