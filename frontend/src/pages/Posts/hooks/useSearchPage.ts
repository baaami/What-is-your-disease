import { useState, useEffect } from 'react'
import API from 'service/api'
import { PostModel } from 'model/postsModel'

const useSearchPage = (
  type: string,
  value: string,
  nodata_callback?: Function,
) => {
  const [postsList, setPostsList] = useState<PostModel[]>([] as PostModel[])

  const getContentInfo = async () => {
    if (type === 'hashtag') {
      try {
        const content_res = await API.posts.getTagSearch(value, 10)
        setPostsList(content_res.data.data.post)
      } catch (e) {
        if (nodata_callback) {
          nodata_callback()
        }
      }
    } else {
      try {
        const content_res = await API.posts.getSearchPosts(value, 10)
        setPostsList(content_res.data.data.post)
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
