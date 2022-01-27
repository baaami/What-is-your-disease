import React, { useState, useRef, useMemo, useEffect } from 'react'
import { useHistory } from 'react-router-dom'

import Input from 'components/Input'
import Button from 'components/Button'
import DropDown from 'components/DropDown'

import API from 'service/api'

import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { PostEditContainer } from 'styles/PostsEdit.styles'

import { PostModel } from 'model/postsModel'
import { categoryList } from 'static/constant'

interface IPostsEditProps {}
const formats = [
  'header',
  'font',
  'size',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
  'image',
  'video',
]
export default function PostsEdit(props: IPostsEditProps) {
  const history = useHistory()
  const quill_ref = useRef<ReactQuill>()
  const [pushState, setPushState] = useState<PostModel>({} as PostModel)
  const [posts_title, setPostsTitle] = useState('')
  const [edit_contents, setEditContents] = useState('')
  const [filter, setFilter] = useState(
    pushState.category ? pushState.category : categoryList[0],
  )
  const [hashtag_value, setHashtagValue] = useState('')
  const [hashtag_list, setHashtagList] = useState<Array<string>>([])
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
      category: filter,
      tags: [...hashtag_list],
    }

    await API.post
      .createPost(req_data)
      .then((res) => {
        history.push(`/posts/detail/${res.data._id}`, {
          is_create_state: true,
        })
      })
      .catch((e) => {
        console.log(e)
      })
  }

  const onClickEdit = async () => {
    const req_data = {
      title: posts_title,
      body: edit_contents,
      category: filter,
    }
    await API.post
      .editPost(pushState._id, req_data)
      .then((res) => {
        alert('게시물 수정에 성공했습니다.')
        history.goBack()
      })
      .catch((e) => {
        console.log(e)
      })
  }

  const isEditButton = () => {
    if (pushState._id) {
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

  const addHashtag = () => {
    const next_hashtag_list = [...hashtag_list, hashtag_value]

    setHashtagList(next_hashtag_list)
    setHashtagValue('')
  }

  const removeHashtag = (target_tag: string) => {
    const next_hashtag = hashtag_list.filter((item) => item !== target_tag)

    setHashtagList(next_hashtag)
  }

  useEffect(() => {
    const path_state = history.location.state as PostModel
    if (path_state) {
      setPostsTitle(path_state.title)
      setEditContents(path_state.body)
      setHashtagList(path_state.tags)
      setPushState(path_state)
    }
    window.scrollTo({ top: 0 })
  }, [])

  return (
    <>
      <PostEditContainer className="wrap">
        <div className="topWrap">
          <Input
            id="posts_title"
            type="text"
            placeholder="제목을 입력해주세요"
            value={posts_title}
            onChange={(e) => setPostsTitle(e.target.value)}
          />
          <DropDown
            filter_data={categoryList}
            setFilter={setFilter}
            now_value={filter}
            style={{ fontSize: '16px' }}
          />
        </div>
        <section className="hashtagArea">
          <div className="hashtagForm">
            <div>
              <Input
                id="hashtag"
                type="text"
                placeholder="해쉬태그를 입력하세요."
                value={hashtag_value}
                onChange={(e) => setHashtagValue(e.target.value)}
                onEnter={addHashtag}
              />
              <button onClick={addHashtag}>추가</button>
            </div>
          </div>
          <div className="hashtagList">
            {hashtag_list.map((item) => {
              return (
                <div onClick={() => removeHashtag(item)}>
                  #{item} <span>X</span>
                </div>
              )
            })}
          </div>
        </section>
        <div>
          <ReactQuill
            ref={(element) => {
              if (element !== null) {
                quill_ref.current = element
              }
            }}
            formats={formats}
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
