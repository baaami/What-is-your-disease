import React, { useEffect, useState } from 'react'
import { RouteComponentProps, useHistory } from 'react-router-dom'
import { PostsDetailContainer } from 'styles/PostsDetail.styles'
import Search from 'components/Search'
import Button from 'components/Button'
import API from 'service/api'
import { useRecoilState } from 'recoil'
import { currentUserInfo } from 'store/userInfo'
import { PostModel } from 'model/postsModel'
interface IPostsDetailProps {}

// export interface PostModel {
//   body: string
//   category: string
//   publishedDate: string
//   title: string
//   user: PostUserModel
//   views: number
//   __v: number
//   _id: string
// }
export default function PostsDetail(props: RouteComponentProps) {
  const history = useHistory()
  const [userInfo] = useRecoilState(currentUserInfo)
  const [post, setPost] = useState<PostModel>({} as PostModel)
  const getPost = async () => {
    const urlParam = props.match.params as { postId: string }
    const postId = urlParam.postId

    await API.post
      .getPost(postId)
      .then((res) => {
        setPost(res.data)
      })
      .catch((e) => {
        console.log(e)
      })
  }

  const onClickEdit = (postData: PostModel) => {
    history.push('/posts/edit', postData)
  }

  const onClickDelete = async () => {
    await API.post
      .deletePost(post._id)
      .then((res) => {
        alert('게시물 삭제에 성공했습니다.')
        history.push('/')
      })
      .catch((e) => {
        console.log(e.response)
      })
  }

  useEffect(() => {
    getPost()
    window.scrollTo({ top: 0 })
  }, [])

  return (
    <PostsDetailContainer className="wrap">
      <Search />
      <section className="postTitle">{post.title}</section>
      <section className="postInfo">
        <div>작성자: {post?.user?.info.name}</div>
        <div>카테고리: {post?.category}</div>
        <div>조회수: {post?.views}</div>
      </section>
      <hr />
      <section
        className="postContents"
        dangerouslySetInnerHTML={{ __html: post?.body }}
      ></section>
      <section className="buttonRow">
        {post.user?._id === userInfo?._id && (
          <>
            <Button
              type="button"
              className="editBtn"
              onClick={() => onClickEdit(post)}
            >
              수정
            </Button>
            <Button type="button" className="delBtn" onClick={onClickDelete}>
              삭제
            </Button>
          </>
        )}
        <Button type="button" onClick={() => history.push('/')}>
          목록
        </Button>
      </section>
    </PostsDetailContainer>
  )
}
