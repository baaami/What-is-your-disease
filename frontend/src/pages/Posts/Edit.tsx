import React, { useState, useRef, useMemo, useEffect } from 'react'
import { useHistory } from 'react-router-dom'

import Input from 'components/Input'
import Button from 'components/Button'

import API from 'service/api'

import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { PostEditContainer } from 'styles/PostsEdit.styles'

import { PostModel } from 'pages/Posts/Detail'

interface IPostsEditProps {}

export default function PostsEdit(props: IPostsEditProps) {
  const history = useHistory()
  const quill_ref = useRef<ReactQuill>()
  const [pushState, setPushState] = useState<PostModel>({} as PostModel)
  const [posts_title, setPostsTitle] = useState('')
  const [edit_contents, setEditContents] = useState('')

  // useMemo를 사용하지 않으면, 키를 입력할 때마다, imageHandler 때문에 focus가 계속 풀리게 됨.
  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          ['bold', 'italic', 'underline', 'strike', 'blockquote'],
          [
            { size: ['small', false, 'large', 'huge'] },
            { color: ['black', 'red', 'blue', 'green'] },
          ],
          [
            { list: 'ordered' },
            { list: 'bullet' },
            { indent: '-1' },
            { indent: '+1' },
            { align: [] },
          ],
          ['image', 'video'],
        ],
        handlers: {
          // 이미지 핸들러가 들어갈 키
          image: '',
        },
      },
    }),
    [],
  )

  const handleSubmitPost = async () => {
    const req_data = {
      title: posts_title,
      body: edit_contents,
      category: 'test',
    }

    await API.post
      .createPost(req_data)
      .then((res) => {
        history.push('/')
      })
      .catch((e) => {
        console.log(e)
      })
  }

  const onClickEdit = async () => {
    const req_data = {
      title: posts_title,
      body: edit_contents,
      category: pushState.category,
    }
    await API.post
      .editPost(pushState._id, req_data)
      .then((res) => {
        alert('게시물 수정에 성공했습니다.')
        history.push('/posts/lists')
      })
      .catch((e) => {
        console.log(e)
      })
  }

  const isEditButton = () => {
    if (pushState) {
      return (
        <>
          <Button type="button" onClick={onClickEdit}>
            수정
          </Button>
        </>
      )
    } else {
      return (
        <>
          <Button type="button" onClick={handleSubmitPost}>
            작성
          </Button>
        </>
      )
    }
  }

  useEffect(() => {
    const path_state = history.location.state as PostModel
    if (path_state) {
      setPostsTitle(path_state.title)
      setEditContents(path_state.body)
      setPushState(path_state)
    }
    window.scrollTo({ top: 0 })
  }, [])

  return (
    <>
      <PostEditContainer className="wrap">
        <Input
          id="posts_title"
          type="text"
          placeholder="제목을 입력해주세요"
          value={posts_title}
          onChange={(e) => setPostsTitle(e.target.value)}
        />
        <div>
          <ReactQuill
            ref={(element) => {
              if (element !== null) {
                quill_ref.current = element
              }
            }}
            value={edit_contents}
            onChange={setEditContents}
            modules={modules}
            theme="snow"
            // style={{ height: '200px' }}
            placeholder="내용을 입력해주세요."
          />
        </div>
        <div className="buttonRow">{isEditButton()}</div>
      </PostEditContainer>
    </>
  )
}
