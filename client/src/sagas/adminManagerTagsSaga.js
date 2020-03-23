import {put, take, call} from 'redux-saga/effects'
import {message} from 'antd'
import {actionsTypes as IndexActionTypes} from '../reducers'
import {actionTypes as ManagerTagsTypes} from '../reducers/adminManagerTags'
import {reqAllTags, reqAddTag, reqDelTag} from '../api'

export function* getAllTags(){
    yield put({type: IndexActionTypes.FETCH_START});
    try{
        return yield call(reqAllTags)
    }catch(err){
        message.err('网络请求错误')
    }finally{
        yield put({type: IndexActionTypes.FETCH_END})
    }
}

export function* getAllTagsFlow() {
    while (true) {
        yield take(ManagerTagsTypes.GET_ALL_TAGS);
        let res = yield call(getAllTags);
        if(res.code === 0){
           
            yield put({type:ManagerTagsTypes.SET_TAGS, data: res.data})
        }else if(res.message === '身份信息已过期，请重新登录'){
            message.error(res.message)
            setTimeout(() => {
                location.replace('/')
            }, 1000);
            yield put({type: IndexActionTypes.USER_LOGOUT})
            
                
        
        }else{
            message.error(res.message)
        }
    }
}

export function* addTag(tag) {
    yield put({type: IndexActionTypes.FETCH_START})
    try{
      return  yield call(reqAddTag, tag)
    }catch(error){
        message.error("网络请求错误！")
    }finally{
        yield put({type:IndexActionTypes.FETCH_END})
    }
}

export function* addTagFlow() {
    while(true){
        let req = yield take(ManagerTagsTypes.ADD_TAG)
        // console.log("addTag()", req)
        let res = yield call(addTag, req.payload)
        if(res.code === 0){
            yield put({type:ManagerTagsTypes.GET_ALL_TAGS})
        }else if(res.message === '身份信息已过期，请重新登录'){
            message.error(res.message)
            setTimeout(() => {
                location.replace('/')
            }, 1000);
            
            yield put({type: IndexActionTypes.USER_LOGOUT})
            
           
        
        }else{
            message.error(res.message)
        }
    }
}

export function* delTag(payload) {

    yield put({type:IndexActionTypes.FETCH_START});
    try{
        return yield call(reqDelTag, payload)
    }catch(error){
        message.error("网络请求错误！")
    }finally{
        yield put({type:IndexActionTypes.FETCH_END})
    }
    
}
export function* delTagFlow() {
    while (true) {
        let req = yield take(ManagerTagsTypes.DELETE_TAG)

        let res = yield call(delTag, req.payload)
        if(res.code === 0){
            message.success("删除成功！")
            yield put({type:ManagerTagsTypes.GET_ALL_TAGS})
        }else if(res.message === '身份信息已过期，请重新登录'){
            message.error(res.message)
            setTimeout(() => {
                location.replace('/')
            }, 1000);
           
            yield put({type: IndexActionTypes.USER_LOGOUT})
         
        }else{
            message.error(res.message)
        }
    }
}