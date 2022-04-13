import { useState, useEffect } from 'react'
import API from 'service/api'
import { PostModel } from 'model/postsModel'

const useSearchPage = (
  type: string,
  value: string,
  nodata_callback?: Function,
) => {
  const [postsList, setPostsList] = useState<PostModel[]>([] as PostModel[])
  const [current_page, setCurrentPage] = useState(1)
  const [total_cnt, setTotalCnt] = useState(0)
  const [period, setPeriod] = useState('all')
  const [orderBy, setOrderBy] = useState('latest')
  const getContentInfo = async () => {
    if (type === 'hashtag') {
      try {
        const content_res = await API.posts.getTagSearch(
          value,
          current_page,
          10,
          period === 'all' ? undefined : period,
          orderBy,
        )
        setPostsList(content_res.data.data.post)
        setTotalCnt(content_res.data.postTotalCnt)
      } catch (e) {
        if (nodata_callback) {
          nodata_callback()
        }
      }
    } else {
      try {
        const content_res = await API.posts.getSearchPosts(
          value,
          current_page,
          10,
          period === 'all' ? undefined : period,
          orderBy,
        )
        setPostsList(content_res.data.data.post)
        setTotalCnt(content_res.data.postTotalCnt)
      } catch (e) {
        if (nodata_callback) {
          nodata_callback()
        }
      }
    }
  }

  useEffect(() => {
    getContentInfo()
  }, [type, value, current_page, period, orderBy])

  return {
    postsList,
    setPostsList,
    total_cnt,
    current_page,
    setCurrentPage,
    period,
    setPeriod,
    orderBy,
    setOrderBy,
  }
}

export default useSearchPage
