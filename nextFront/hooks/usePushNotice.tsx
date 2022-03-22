import React, { useState } from 'react'
import API from 'service/api'
import { useRecoilState } from 'recoil'
import { pushListInit } from 'store/pushNotice'
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

const usePushNotice = () => {
  const [pushList, setPushList] = useRecoilState(pushListInit)

  const setPushNoticeLists = async () => {
    await API.user.getPushList().then((res) => {
      setPushList(() => [...res.data])
    })
  }

  const removePushList = () => {
    setPushList([])
  }

  return {
    setPushNoticeLists,
    removePushList,
  }
}

export default usePushNotice
