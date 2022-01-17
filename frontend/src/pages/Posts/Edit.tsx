import React, { useState, useRef, useMemo } from 'react'
import { useHistory } from 'react-router-dom'

import Input from 'components/Input'

import API from 'service/api'
import { PostUserModel } from 'service/model/postModel'

import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { PostEditContainer } from 'styles/PostsEdit.styles'
import { userInfo } from 'os'

interface IPostsEditProps {}

export default function PostsEdit(props: IPostsEditProps) {
  const history = useHistory()
  const quill_ref = useRef<ReactQuill>()
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
      user: JSON.parse(
        localStorage.getItem('userInfo') as string,
      ) as PostUserModel,
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
        <button onClick={handleSubmitPost}>작성</button>
      </PostEditContainer>
    </>
  )
}
