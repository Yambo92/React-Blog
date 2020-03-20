import {call, take, put, select} from 'redux-saga/effects'
import {actionsTypes as IndexActionTypes} from '../reducers'
import {actionTypes as ArticleTypes} from '../reducers/adminManagerArticle'
import {reqArticleLists} from '../api'
import {message} from 'antd'
export function* getArticleList(pageNum){
    yield put({type: IndexActionTypes.FETCH_START})
    try{
        return yield call(reqArticleLists, pageNum)
    }catch(err){
        message.error('网络请求错误')
    }finally{
        yield put({type: IndexActionTypes.FETCH_END})
    }
}

export function* getArticleListFlow() {
    while(true){
        let req = yield take(ArticleTypes.ADMIN_GET_ARTICLE_LIST);
        let res = yield call(getArticleList, req.pageNum);
        if(res){
            if(res.code === 0){
                res.data.pageNum = req.pageNum;
                yield put({type: ArticleTypes.ADMIN_RESPONSE_GET_ARTICLE_LIST, data: res.data})
            } else if(res.message === '身份信息已过期，请重新登录'){
                message.error(res.message)
                setTimeout(() => {
                    location.replace('/')
                }, 1000);
            }else{
                message.error(res.message)
            }
        }
    }
}