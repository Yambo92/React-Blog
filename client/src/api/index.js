import ajax from './ajax'
import {message} from 'antd'

/*登录*/ 
export const reqLogin = ({...payload}) => ajax('/user/login', {...payload}, 'POST') 

/*注册用户*/
export const reqRegister = (data) => ajax('/user/register', data, 'POST') 

/*删除用户*/
export const reqRemoveUser = (_id) => ajax('/user/deluser', {_id}, 'POST')

/* 更新用户角色 */ 
export const reqChangeRole = (_id,type) => ajax('/user/changeRole', {_id, type}, 'POST')

/*用户登录状态验证*/ 
export const reqUserAuth = () => ajax('/user/userInfo')

/* 获取用户信息 */ 
export const reqGetAllUsers = (pageNum=1) => ajax('/admin/getUsers', {pageNum})

/*退出登录*/ 
export const reqLogout = () => ajax('/user/logout')

/*获取所有标签*/
export const reqAllTags = () => ajax('/getAllTags') 

/*添加标签*/ 
export const reqAddTag = (payload) => ajax('/admin/tags/addTag', {...payload}, "POST")

/*删除标签*/ 
export const reqDelTag = (payload) => ajax('/admin/tags/delTag', {...payload}) 

/*获取文章列表*/ 
export const reqArticleLists = ({tag, pageNum, pageSize,isPublish=true}) => ajax('/getArticles',{tag,pageNum,pageSize, isPublish})

/*发布文章*/ 
export const reqAddNewArticle = ({...data}) => ajax('/admin/article/addArticle',{...data}, 'POST')