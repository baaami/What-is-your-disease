import { useState, useEffect } from 'react'
import API from 'service/api'
import { PostModel } from 'model/postsModel'

/*
author: "jongwho@datamarketing.co.kr"
cont_sect: 1
content: "테스트 테스트"
id: 6
mo_img: null
pc_img: "https://dmk-mdr-backend-dev.s3.ap-northeast-2.amazonaws.com/media/usecase_pc/2e290c6bd11cef45db4584506f717b0c.jpg"
title: "테스트"
url: "https://www.maderi.kr"
view_cnt: 1
*/
const useSearchPage = (
  type: string,
  value: string,
  nodata_callback?: Function,
) => {
  const [postsList, setPostsList] = useState<PostModel[]>([] as PostModel[])

  const getContentInfo = async () => {
    if (type === 'hashtag') {
      try {
        const content_res = await API.posts.getTagSearch(value)
        setPostsList(content_res.data)
      } catch (e) {
        if (nodata_callback) {
          nodata_callback()
        }
      }
    } else {
      try {
        const content_res = await API.posts.getSearchPosts(value)
        setPostsList(content_res.data)
      } catch (e) {
        if (nodata_callback) {
          nodata_callback()
        }
      }
    }
  }

  useEffect(() => {
    getContentInfo()
  }, [type, value])

  return {
    postsList,
    setPostsList,
  }
}

export default useSearchPage
