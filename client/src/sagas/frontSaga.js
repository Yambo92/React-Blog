import {take, call, put} from 'redux-saga/effects'
import {reqArticleLists} from '../api'
import {actionsTypes as IndexActionTypes} from '../reducers'
import {actionTypes as FrontActionTypes} from '../reducers/frontReducer'
import {message} from 'antd'
export function* getArticleList(tag, pageNum, pageSize) {
    yield put({type: IndexActionTypes.FETCH_START})
    try{
        return yield call(reqArticleLists, tag, pageNum, pageSize)
    }catch(err){
        message.error('网络请求错误')
    }finally{
        yield put({type: IndexActionTypes.FETCH_END})
    }
}

export function* getArticlesListFlow() {
    while(true){
        let req = yield take(FrontActionTypes.GET_ARTICLE_LIST);
        let res = yield call(getArticleList, {tag:req.tag, pageNum:req.pageNum, pageSize: req.pageSize})
        if(res){
            if(res.code === 0){
                res.data.pageNum = req.pageNum;
                yield put({type: FrontActionTypes.RESPONSE_ARTICLE_LIST, data:res.data})
            }else {
                message.error(res.message)
            }
        }
    }
}