import React, { useEffect, useState } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { PostsDetailContainer } from 'styles/PostsDetail.styles'
import Search from 'components/Search'
import API from 'service/api'
import { PostUserModel } from 'service/model/postModel'
interface IPostsDetailProps {}

interface PostModel {
  body: string
  category: string
  publishedDate: string
  title: string
  user: PostUserModel
  views: number
  __v: number
  _id: string
}
export default function PostsDetail(props: RouteComponentProps) {
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
  useEffect(() => {
    getPost()
  }, [])
  return (
    <PostsDetailContainer className="wrap">
      <Search />
      <section className="postTitle">{post.title}</section>
      <section className="postInfo">
        <div>작성자: {post?.user?.info.name}</div>
        <div>조회수: {post?.views}</div>
      </section>
      <hr />
      <section
        className="postContents"
        dangerouslySetInnerHTML={{ __html: post?.body }}
      ></section>
    </PostsDetailContainer>
  )
}
