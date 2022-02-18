import Axios, { AxiosRequestConfig } from "axios";
import { BASE_URL, GET, JSON_HEADER } from "shared/api_constant";

export const posts = {
  getLatestPosts: async (page: number, per_page: number) => {
    const token = localStorage.getItem("jwttoken");
    const config: AxiosRequestConfig = {
      method: GET,
      url: `http://locaohost:4000/api/posts/latest`,
      headers: {
        ...JSON_HEADER,
        Authorization: `Bearer ${token}`,
      },
      params: {
        page,
        pageNum: per_page,
      },
    };

    return Axios(config);
  },
  getHotPosts: async () => {
    const token = localStorage.getItem("jwttoken");
    const config: AxiosRequestConfig = {
      method: GET,
      url: "/api/posts/hot",
      headers: {
        ...JSON_HEADER,
        Authorization: `Bearer ${token}`,
      },
    };

    return Axios(config);
  },
  getMyPosts: async (id: string, page: number, per_page: number) => {
    const token = localStorage.getItem("jwttoken");
    const config: AxiosRequestConfig = {
      method: GET,
      url: `/api/posts/user/${id}`,
      headers: {
        ...JSON_HEADER,
        Authorization: `Bearer ${token}`,
      },
      params: {
        page,
        pageNum: per_page,
      },
    };
    return Axios(config);
  },
  getFilterPosts: async (orderBy: string, page: number, per_page: number) => {
    const token = localStorage.getItem("jwttoken");
    const config: AxiosRequestConfig = {
      method: GET,
      url: `/api/posts/filter/${orderBy}`,
      headers: {
        ...JSON_HEADER,
        Authorization: `Bearer ${token}`,
      },
      params: {
        page,
        pageNum: per_page,
      },
    };
    return Axios(config);
  },
  getCategoryPosts: async (
    category: string,
    page: number,
    per_page: number
  ) => {
    const token = localStorage.getItem("jwttoken");
    const config: AxiosRequestConfig = {
      method: GET,
      url: `/api/posts/`,
      headers: {
        ...JSON_HEADER,
        Authorization: `Bearer ${token}`,
      },
      params: {
        category,
        page,
        pageNum: per_page,
      },
    };
    return Axios(config);
  },
  getTagSearch: async (hashtag: string, per_page: number) => {
    const token = localStorage.getItem("jwttoken");
    const config: AxiosRequestConfig = {
      method: GET,
      url: `/api/posts/latest/`,
      headers: {
        ...JSON_HEADER,
        Authorization: `Bearer ${token}`,
      },
      params: {
        tag: hashtag,
        pageNum: per_page,
      },
    };
    return Axios(config);
  },
  getSearchPosts: async (value: string, per_page: number) => {
    const token = localStorage.getItem("jwttoken");
    const config: AxiosRequestConfig = {
      method: GET,
      url: `/api/search/`,
      headers: {
        ...JSON_HEADER,
        Authorization: `Bearer ${token}`,
      },
      params: {
        q: value,
        pageNum: per_page,
      },
    };
    return Axios(config);
  },
  getFollowPosts: async (page: number, postNum: number) => {
    const token = localStorage.getItem("jwttoken");
    const config: AxiosRequestConfig = {
      method: GET,
      url: `/api/posts/follow/`,
      headers: {
        ...JSON_HEADER,
        Authorization: `Bearer ${token}`,
      },
      params: {
        page,
        postNum,
      },
    };
    return Axios(config);
  },
};
