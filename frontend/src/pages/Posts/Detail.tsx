import React, { useEffect, useState } from 'react'
import { RouteComponentProps, useHistory } from 'react-router-dom'
import {
  PostsDetailContainer,
  CommentsSection,
  Buttons,
} from 'styles/PostsDetail.styles'
import Search from 'components/Search'
import Button from 'components/Button'
import API from 'service/api'
import { useRecoilState } from 'recoil'
import { currentUserInfo } from 'store/userInfo'
import { PostModel } from 'model/postsModel'
import reply from '../../assets/img/reply.svg'

interface IPostsDetailProps {}

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
        setPost(res.data.data.post)
      })
      .catch((e) => {
        console.log(e)
      })
  }

  const onClickEdit = (postData: PostModel) => {
    history.push('/posts/edit', postData)
  }

  const onClickDelete = async () => {
    if (
      !window.confirm(
        '삭제된 게시글은 되돌릴 수 없습니다. 정말로 삭제 하시겠습니까?',
      )
    ) {
      return
    }
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

  const onClickListsLink = () => {
    const stateFromPush = history.location.state as {
      is_create_state?: boolean
    }
    if (stateFromPush?.is_create_state) {
      history.push('/')
    } else {
      history.goBack()
    }
  }

  const onClickHashtag = (target_hashtag: string) => {
    history.push(`/posts/lists/search/hashtag/${target_hashtag}`)
  }

  useEffect(() => {
    getPost()
    window.scrollTo({ top: 0 })
  }, [])

  const Comments = [
    { txt: '오 꿀팀 감사합니다.' },
    { txt: '좋은 하루 되세요~' },
    { txt: '감사합니다:)' },
  ]

  return (
    <PostsDetailContainer className="wrap">
      <Search />
      <section className="postTitle">{post.title}</section>
      <section className="postInfo">
        <div>작성자: {post?.user?.info.nickname}</div>
        <div>카테고리: {post?.category}</div>
        <div className="hashtag">
          해쉬태그:{' '}
          {post?.tags?.map((item, index) => {
            if (index === post.tags.length - 1) {
              return <span onClick={() => onClickHashtag(item)}>#{item}</span>
            } else {
              return <span onClick={() => onClickHashtag(item)}>#{item}, </span>
            }
          })}
        </div>
        <div>조회수: {post?.views}</div>
      </section>
      <hr />
      <div className="createdAt">
        작성일: {post?.publishedDate?.split('T')[0]}
      </div>
      <section
        className="postContents"
        dangerouslySetInnerHTML={{ __html: post?.body }}
      ></section>
      <Button type="button" className="commentsBtn" onClick={undefined}>
        + 댓글 작성하기
      </Button>
      <CommentsSection className="wrap">
        {Comments.map((comment, idx) => {
          return (
            <div className="comment" key={idx}>
              <span>{`작성자`}</span>
              {comment.txt}
              <Button type="button" className="replyBtn" onClick={undefined}>
                <img src={reply} alt="답글 아이콘" />
              </Button>
              <div className="replyWrap">
                <div className="reply">
                  <span>{`작성자`}</span>답글입니다.
                </div>
                <div className="reply">
                  <span>{`작성자`}</span>답글입니다.
                </div>
                <div className="reply">
                  <span>{`작성자`}</span>답글입니다.
                </div>
                <div className="reply">
                  <span>{`작성자`}</span>답글입니다.
                </div>
              </div>
            </div>
          )
        })}
      </CommentsSection>
      <Buttons className="buttonRow">
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
        <Button type="button" onClick={() => onClickListsLink()}>
          목록
        </Button>
      </Buttons>
    </PostsDetailContainer>
  )
}
