import {put, take, call} from 'redux-saga/effects'
import {message} from 'antd'
import {actionsTypes as IndexActionTypes} from '../reducers'
import {actionTypes as ManagerTagsTypes} from '../reducers/adminManagerTags'
import {reqAllTags} from '../api'


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
            // let tempArr = [];
            // for(let i = 0; i < res.data.length; i++){
            //     tempArr.push(res.data[i].name)
            // }
            yield put({type:ManagerTagsTypes.SET_TAGS, data: res.data})
        }else if(res.message === '身份信息已过期，请重新登录'){
            message.error(res.message)
            setTimeout(() => {
                location.replace('/')
            }, 1000);
        }else{
            message.error(res.message)
        }
    }
}