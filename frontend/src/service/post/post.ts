import Axios, { AxiosRequestConfig } from 'axios'
import {
  FORM_HEADER,
  GET,
  JSON_HEADER,
  POST,
  PATCH,
  DELETE,
} from 'shared/api_constant'
import { CreatePostModel } from '../model/postModel'
export const post = {
  createPost: async (post_data: CreatePostModel) => {
    const token = localStorage.getItem('jwttoken')
    const config: AxiosRequestConfig = {
      method: POST,
      url: '/api/post/write',
      headers: {
        ...JSON_HEADER,
        Authorization: `Bearer ${token}`,
      },
      data: {
        ...post_data,
      },
    }
    return Axios(config)
  },
  getPost: async (post_id: string, cpage: number) => {
    const token = localStorage.getItem('jwttoken')
    const config: AxiosRequestConfig = {
      method: GET,
      url: `/api/post/read/${post_id}`,
      headers: {
        ...JSON_HEADER,
        Authrization: `Bearer ${token}`,
      },
      params: {
        cpage,
      },
    }

    return Axios(config)
  },

  editPost: async (post_id: string, post_body: CreatePostModel) => {
    const token = localStorage.getItem('jwttoken')
    const config: AxiosRequestConfig = {
      method: PATCH,
      url: `/api/post/edit/${post_id}`,
      headers: {
        ...JSON_HEADER,
        Authorization: `Bearer ${token}`,
      },
      data: {
        ...post_body,
      },
    }
    return Axios(config)
  },
  deletePost: async (post_id: string) => {
    const token = localStorage.getItem('jwttoken')
    const config: AxiosRequestConfig = {
      method: DELETE,
      url: `/api/post/delete/${post_id}`,
      headers: {
        ...JSON_HEADER,
        Authorization: `Bearer ${token}`,
      },
    }
    return Axios(config)
  },
  uploadImage: async (img: File) => {
    const formData = new FormData()
    formData.append('file', img)
    const token = localStorage.getItem('jwttoken')
    const config: AxiosRequestConfig = {
      method: POST,
      url: `/api/post/upload`,
      headers: {
        ...FORM_HEADER,
        Authorization: `Bearer ${token}`,
      },
      data: formData,
    }
    return Axios(config)
  },
  createComment: async (post_id: string, contents: string) => {
    const token = localStorage.getItem('jwttoken')
    const config: AxiosRequestConfig = {
      method: POST,
      url: `/api/post/${post_id}/comment/write`,
      headers: {
        ...JSON_HEADER,
        Authorization: `Bearer ${token}`,
      },
      data: {
        text: contents,
      },
    }
    return Axios(config)
  },
  removeComment: async (post_id: string, comment_id: string) => {
    const token = localStorage.getItem('jwttoken')
    const config: AxiosRequestConfig = {
      method: DELETE,
      url: `/api/post/${post_id}/comment/delete/${comment_id}`,
      headers: {
        ...JSON_HEADER,
        Authorization: `Bearer ${token}`,
      },
    }
    return Axios(config)
  },
  createReply: async (
    comment_id: string,
    contents: string,
    post_id: string,
  ) => {
    const token = localStorage.getItem('jwttoken')
    const config: AxiosRequestConfig = {
      method: POST,
      url: `/api/post/${post_id}/comment/${comment_id}/reply/write`,
      headers: {
        ...JSON_HEADER,
        Authorization: `Bearer ${token}`,
      },
      data: {
        text: contents,
      },
    }
    return Axios(config)
  },
  removeReply: async (
    comment_id: string,
    reply_id: string,
    post_id: string,
  ) => {
    const token = localStorage.getItem('jwttoken')
    const config: AxiosRequestConfig = {
      method: DELETE,
      url: `/api/post/${post_id}/comment/${comment_id}/reply/delete/${reply_id}`,
      headers: {
        ...JSON_HEADER,
        Authorization: `Bearer ${token}`,
      },
    }
    return Axios(config)
  },

  addPostLike: async (post_id: string) => {
    const token = localStorage.getItem('jwttoken')
    const config: AxiosRequestConfig = {
      method: POST,
      url: `/api/post/${post_id}/like/`,
      headers: {
        ...JSON_HEADER,
        Authorization: `Bearer ${token}`,
      },
    }
    return Axios(config)
  },

  addCommentLike: async (post_id: string, comment_id: string) => {
    const token = localStorage.getItem('jwttoken')
    const config: AxiosRequestConfig = {
      method: POST,
      url: `/api/post/${post_id}/comment/like/${comment_id}`,
      headers: {
        ...JSON_HEADER,
        Authorization: `Bearer ${token}`,
      },
    }
    return Axios(config)
  },

  addReplyLike: async (
    post_id: string,
    comment_id: string,
    reply_id: string,
  ) => {
    const token = localStorage.getItem('jwttoken')
    const config: AxiosRequestConfig = {
      method: POST,
      url: `/api/post/${post_id}/comment/${comment_id}/reply/like/${reply_id}`,
      headers: {
        ...JSON_HEADER,
        Authorization: `Bearer ${token}`,
      },
    }
    return Axios(config)
  },
}
