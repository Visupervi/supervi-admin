import {APIS} from "@/constant"
import { request } from "@/utils"
export const getChannels = () => {
  return request({
    url: APIS.channels,
    method: "get"
  })
}

export const saveArticles = params => {
  return request({
    url: APIS.articles,
    method: "post",
    data: params
  })
}


export const getArticleList = params => {
  return request({
    url: APIS.articleList,
    method: "get",
    params
  })
}

export const deleteArticle = id => {
  return request({
    url: `${APIS.articleList}/${id}`,
    method: "delete"
  })
}

export const getArticleDetail = id => {
  return request({
    url: `${APIS.articleList}/${id}`,
    method: "get"
  })
}