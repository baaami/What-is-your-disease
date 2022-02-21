import React, { useEffect, useState } from 'react'
import { GetServerSideProps } from 'next'
// import { RouteComponentProps, useHistory } from 'react-router-dom'
import Router, { useRouter } from 'next/router'
import Search from 'components/Search'
import Button from 'components/Button'
import Pagination from 'components/Pagination'
import API from 'service/api'
import { useRecoilState } from 'recoil'
import { currentUserInfo } from 'store/userInfo'
import { PostModel } from 'model/postsModel'
import reply from 'assets/img/reply.svg'
import { POST } from 'shared/api_constant'
import { Container } from 'common.styles'
import {
  PostsDetailContainer,
  PostInfo,
  TopSection,
  CommentsSection,
  CreateComment,
  Buttons,
} from 'styles/posts/styles'
import like_out from 'assets/img/like_out.svg'
import like_active from 'assets/img/like_active.svg'

interface IPostsDetailProps {}

export default function PostsDetail(props: {
  postData: {
    commentTotalCnt: number
    data: {
      post: PostModel
    }
  }
}) {
  const router = useRouter()
  const [userInfo] = useRecoilState(currentUserInfo)
  const [post, setPost] = useState<PostModel>({} as PostModel)
  const [comment_value, setCommentValue] = useState('')
  const [reply_value, setReplyValue] = useState('')
  const [comments_list, setCommentsList] = useState([])
  const [comments_cnt, setCommentsCnt] = useState(0)
  const [is_write_comment, setIsWriteComment] = useState(false)
  const [is_reply, setIsReply] = useState({} as any)
  const [current_page, setCurrentPage] = useState(1)

  const getPost = async () => {
    const postId = router.query.postId as string

    await API.post
      .getPost(postId, current_page)
      .then((res) => {
        setCommentsList(res.data.data.post.comments?.reverse())
        setPost(res.data.data.post)
        setCommentsCnt(res.data.commentTotalCnt)
        setCommentValue('')
        setIsWriteComment(false)
        setReplyValue('')
        let nextReplyState = res.data.data.post.comments.map((item: any) => {
          return {
            [item._id]: false,
          }
        })

        let nextReplyStateObj = {}

        for (let i = 0; i < nextReplyState.length; i++) {
          const key = Object.keys(nextReplyState[i])[0]
          nextReplyStateObj = {
            ...nextReplyStateObj,
            [key]: false,
          }
        }

        setIsReply(nextReplyStateObj)
      })

      .catch((e) => {
        console.log(e)
      })
  }

  const onClickEdit = (postData: PostModel) => {
    // router.push('/posts/edit', postData)
    console.log(postData.tags)
    Router.push({
      pathname: '/posts/edit',
      query: {
        title: postData.title,
        description: postData.body,
        id: postData._id,
        tag: postData.tags,
        category: postData.category,
      },
    })
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
        router.push('/')
      })
      .catch((e) => {
        console.log(e.response)
      })
  }

  const onClickListsLink = () => {
    // const stateFromPush = router.location.state as {
    //   is_create_state?: boolean
    // }
    // if (stateFromPush?.is_create_state) {
    //   router.push('/')
    // } else {
    //   router.back()
    // }
  }

  const onClickHashtag = (target_hashtag: string) => {
    // router.push(`/posts/lists/search/hashtag/${target_hashtag}`);
    console.log(target_hashtag)
    router.push({
      pathname: `/posts/lists/search/hashtag/${target_hashtag}`,
      // query: {
      //   type: 'hashtag',
      //   value: target_hashtag,
      // },
    })
  }

  const handleSubmitComment = async () => {
    if (comment_value === '') {
      return alert('댓글을 입력해주세요')
    }
    const postId = router.query.postId as string
    await API.post
      .createComment(postId, comment_value)
      .then((res) => {
        getPost()
      })
      .catch((e) => {
        console.log(e)
      })
  }

  const handleSubmitReply = async (comment_id: string, contents: string) => {
    const postId = router.query.postId as string
    if (reply_value === '') {
      return alert('답글을 입력해주세요')
    }

    await API.post
      .createReply(comment_id, contents, postId)
      .then((res) => {
        getPost()
      })
      .catch((e) => {
        console.log(e)
      })
  }

  const handleRemoveComment = async (comment_id: string) => {
    if (!window.confirm('댓글을 삭제하시겠습니까?')) {
      return
    }
    const postId = router.query.postId as string
    await API.post
      .removeComment(postId, comment_id)
      .then((_) => {
        getPost()
      })
      .catch((e) => {
        alert('댓글 삭제에 실패하였습니다.')
        console.log(e)
      })
  }

  const handleRemoveReply = async (comment_id: string, reply_id: string) => {
    const postId = router.query.postId as string
    if (!window.confirm('답글을 삭제하시겠습니까?')) {
      return
    }
    await API.post
      .removeReply(comment_id, reply_id, postId)
      .then((_) => {
        getPost()
      })
      .catch((e) => {
        alert('답글 삭제에 실패하였습니다.')
        console.log(e)
      })
  }

  const onClickPostLike = async () => {
    const postId = router.query.postId as string

    await API.post
      .addPostLike(postId)
      .then((res) => {
        // getPost()
        router.replace(`/${router.asPath}`)
      })
      .catch((e) => {
        alert('좋아요실패')
      })
  }

  const onClickCommentLike = async (comment_id: string) => {
    const postId = router.query.postId as string

    await API.post
      .addCommentLike(postId, comment_id)
      .then(() => getPost())
      .catch((e) => {
        console.log(e)
        alert('댓글좋아요 실패')
      })
  }

  const onClickReplyLike = async (comment_id: string, reply_id: string) => {
    const postId = router.query.postId as string

    await API.post
      .addReplyLike(postId, comment_id, reply_id)
      .then(() => {
        getPost()
      })
      .catch((e) => {
        console.log(e)
        alert('답글 좋아요 실패')
      })
  }

  useEffect(() => {
    console.log(router.query)
    window.scrollTo({ top: 0 })
  }, [])

  useEffect(() => {
    getPost()
    console.log(props)
  }, [current_page])

  return (
    <PostsDetailContainer>
      <Container>
        <TopSection>
          <div className="category">{props?.postData?.data.post.category}</div>
          <div className="hashtag">
            {props?.postData?.data.post.tags?.map((item, index) => (
              <span key={index} onClick={() => onClickHashtag(item)}>
                #{item}
              </span>
            ))}
          </div>
        </TopSection>
        <PostInfo>
          <div className="postTitle">{props?.postData?.data.post.title}</div>
          <div className="postInfo">
            <span>{props?.postData?.data.post.user?.info.nickname}</span>
            <span className="createdAt">
              {props?.postData?.data.post.publishedDate?.split('T')[0]}
            </span>
            <span>조회수 {props?.postData?.data.post.views}</span>
            <span>
              <button onClick={() => onClickPostLike()}>
                <img
                  src={
                    props?.postData?.data.post.likeMe?.includes(userInfo._id)
                      ? like_active.src
                      : like_out.src
                  }
                  alt="like out icon"
                />
                {/* <img src={like_active} alt="like active icon" /> */}
              </button>
              {post.likes}
            </span>
          </div>
        </PostInfo>
        <hr />
        <section
          className="postContents"
          dangerouslySetInnerHTML={{ __html: props?.postData?.data.post.body }}
        ></section>
        <hr />
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
        <Button
          type="button"
          className="commentsBtn"
          onClick={() => setIsWriteComment(!is_write_comment)}
        >
          {is_write_comment ? '취소' : '+ 댓글 작성하기'}
        </Button>
        {is_write_comment && (
          <CreateComment>
            <textarea
              value={comment_value}
              onChange={(e) => setCommentValue(e.target.value)}
            ></textarea>
            <Button
              id="submitComment"
              type="button"
              onClick={handleSubmitComment}
            >
              등록
            </Button>
          </CreateComment>
        )}
        <CommentsSection>
          <div className="commentsCnt">
            댓글 {props.postData.commentTotalCnt}개
          </div>
          {comments_list.map((comment: any, idx) => {
            return (
              <div className="comment" key={idx}>
                <div
                  style={{ display: 'flex', justifyContent: 'space-between' }}
                >
                  <div>
                    <span>{comment.user.info.nickname}</span>
                    {comment.text}
                    <Button
                      type="button"
                      className="replyBtn"
                      onClick={() =>
                        setIsReply({
                          ...is_reply,
                          [comment._id]: !is_reply[comment._id],
                        })
                      }
                    >
                      <img src={reply.src} alt="답글 아이콘" />
                    </Button>
                  </div>
                  <div
                    style={{ cursor: 'pointer', width: 'fit-content' }}
                    onClick={() => onClickCommentLike(comment._id)}
                  >
                    <img
                      width="30"
                      src={
                        comment?.likeMe?.includes(userInfo._id)
                          ? like_active.src
                          : like_out.src
                      }
                      alt="like out icon"
                    />{' '}
                    {comment.likes}
                  </div>
                </div>
                {userInfo._id === comment.user._id && (
                  <div>
                    <button
                      className="removeComment"
                      onClick={() => handleRemoveComment(comment._id)}
                    >
                      삭제
                    </button>
                  </div>
                )}
                {is_reply[comment._id] && (
                  <CreateComment>
                    <textarea
                      value={reply_value}
                      onChange={(e) => setReplyValue(e.target.value)}
                    ></textarea>
                    <Button
                      id="submitComment"
                      type="button"
                      onClick={() =>
                        handleSubmitReply(comment._id, reply_value)
                      }
                    >
                      등록
                    </Button>
                  </CreateComment>
                )}
                {comment.replies?.length !== 0 && (
                  <div className="replyWrap">
                    {comment.replies
                      ?.reverse()
                      .map((reply: any, index: number) => {
                        return (
                          <>
                            <div className="reply">
                              <div>
                                <span>{reply?.user?.info?.nickname}</span>
                                {reply?.text}
                              </div>
                              <div
                                style={{
                                  cursor: 'pointer',
                                  width: 'fit-content',
                                }}
                                onClick={() =>
                                  onClickReplyLike(comment._id, reply._id)
                                }
                              >
                                <img
                                  src={
                                    reply?.likeMe?.includes(userInfo._id)
                                      ? like_active.src
                                      : like_out.src
                                  }
                                  alt="like out icon"
                                />{' '}
                                {reply.likes}
                              </div>
                            </div>
                            {userInfo._id === reply.user._id && (
                              <div>
                                <button
                                  className="removeComment"
                                  onClick={() =>
                                    handleRemoveReply(comment._id, reply._id)
                                  }
                                >
                                  삭제
                                </button>
                              </div>
                            )}
                          </>
                        )
                      })}
                  </div>
                )}
              </div>
            )
          })}
          <Pagination
            total_count={comments_cnt}
            current_page={current_page}
            onChange={setCurrentPage}
            block={5}
            per_page={10}
          />
        </CommentsSection>
      </Container>
    </PostsDetailContainer>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const params = context.params as { postId: string }
  const res = await API.post.getPost(params.postId, 1)

  // data 없을 땐 리턴값을 달리함
  if (!res) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }
  // console.log(res)
  //pageProps로 넘길 데이터
  return { props: { postData: res.data } }
}
