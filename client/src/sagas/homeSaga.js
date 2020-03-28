import {put, take, call} from 'redux-saga/effects'
import {actionsTypes as IndexActionTypes} from '../reducers'
import {reqLogin, reqRegister, reqLogout} from '../api'
import {message} from 'antd'


export function* login({username, password}) {
    yield put({type:IndexActionTypes.FETCH_START});
    try{
        return yield call(reqLogin, {username, password})
    }catch(error){
        message.error("请求出错")
        // yield put({type: IndexActionTypes.SET_MESSAGE, msgContent: "用户名或密码错误",msgType:0})
    }finally{
        yield put({type:IndexActionTypes.FETCH_END})
    }
}

export function* register(data) {
    yield put({type:IndexActionTypes.FETCH_START});
    try{
        return yield call(reqRegister, data)
    }catch(error){
        message.error(error.message)
        // yield put({type:IndexActionTypes.SET_MESSAGE, msgContent:'注册失败', msgType:0})
    }finally{
        yield put({type:IndexActionTypes.FETCH_END})
    }
}

export function* loginFlow() {
    while(true){
        let request = yield take(IndexActionTypes.USER_LOGIN);
        // console.log('take():', request) //The result of yield take(pattern) is an action object being dispatched.
        let response = yield call(login, request.payload);
        if(response&&response.code === 0){
            message.destroy()
            message.success('登录成功！')
            // yield put({type:IndexActionTypes.SET_MESSAGE, msgContent: "登录成功！", msgType:1});
            yield put({type:IndexActionTypes.RESPONSE_USER_INFO, data: response.data})
        }else if(response&&response.code=== 1){
            message.destroy()
            message.error(response.message) 
        }else{
            message.destroy()
            message.error(response.message) 
        }
    }
}

export function* registerFlow() {
    while (true) {
        let request = yield take(IndexActionTypes.USER_REGISTER);
        let response = yield call(register, request.data);
        if(response&&response.code === 0){
            message.destroy()
            message.success('注册成功！')
            // yield put({type:IndexActionTypes.SET_MESSAGE, msgContent:"注册成功！", msgType:1});
            yield put({type:IndexActionTypes.RESPONSE_USER_INFO, data:response.data})
        }else if(response&&response.code === 1){
            message.error(response.message)
            // yield put({type:IndexActionTypes.SET_MESSAGE, msgContent: response.message, msgType:0});
        }
    }
}

export function* user_auth() {
    while(true){
        yield take(IndexActionTypes.USER_AUTH);
        try{
            yield put({type: IndexActionTypes.FETCH_START});
            let response = yield call(reqUserAuth);
            if(response && response.code === 0){
                yield put({type:IndexActionTypes.RESPONSE_USER_INFO, data:response.data})
            }
        }catch(error){
            console.log(error)
        }finally{
            yield put({type:IndexActionTypes.FETCH_END})
        }
    }
}

export function* logoutFlow() {
    while(true){
         yield take(IndexActionTypes.USER_LOGOUT);
         let response = yield call(reqLogout)
         if(response&&response.code === 0){
             yield put({type:IndexActionTypes.RESPONSE_USER_INFO, data: {}})
         }
    }
}