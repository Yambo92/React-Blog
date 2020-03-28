import {put, take, call, delay} from 'redux-saga/effects'
import {actionsTypes as IndexActionTypes} from '../reducers'
import {actionTypes as ManagerUserActionTypes} from '../reducers/adminManagerUser'
import {message} from 'antd'
import {reqGetAllUsers, reqLogout, reqRemoveUser, reqChangeRole} from '../api'

export function* getAllUsers(pageNum) {
    yield put({type: IndexActionTypes.FETCH_START})
    try{
        return yield call(reqGetAllUsers, pageNum)
    }catch(err){
        message.destroy()
        message.error('请求失败')
    }finally{
        yield put({type: IndexActionTypes.FETCH_END})
    }
}
export function* getAllUsersFlow(){
    while(true){
        let req = yield take(ManagerUserActionTypes.GET_ALL_USER);
        let res = yield call(getAllUsers, req.pageNum);
        if(res.code === 0){
            yield put({type: ManagerUserActionTypes.RESOLVE_GET_ALL_USERS, data: res.data})
        }else if(res.message === '身份信息已过期，请重新登录'){
            message.destroy()
             message.error(res.message)
             yield delay(500)
             let response = yield call(reqLogout)
             if(response&&response.code === 0){
                 yield put({type:IndexActionTypes.RESPONSE_USER_INFO, data: {}})
                location.replace('/')   
             }
          
        }else{
            message.error(res.message)
        }
    }
}

export function* delUser(params) {
    yield put({type: IndexActionTypes.FETCH_START});
    try{
        return  yield call(reqRemoveUser, params);

    }catch(error){
        message.error(error.message)
    }finally{
        yield put({type: IndexActionTypes.FETCH_END})
    }

}

export function* delUserFlow() {
    while(true){
        let req = yield take(ManagerUserActionTypes.DEL_USER)
        let result = [];
        if (typeof req.ids === 'string') {
            result.push(req.ids)
        }else{
            result = req.ids
        }
        let res = yield call(delUser, result);
        if(res.code === 0){
            message.destroy()
            message.success('删除成功');
            yield put({type: ManagerUserActionTypes.GET_ALL_USER})
        
        }else if(res.message === '身份信息已过期，请重新登录'){
            message.destroy()
             message.error(res.message)
             yield delay(500)
             let response = yield call(reqLogout)
             if(response&&response.code === 0){
                 yield put({type:IndexActionTypes.RESPONSE_USER_INFO, data: {}})
                location.replace('/')   
             }
          
        }else{
            message.error(res.message)
        }
    }
  
}

export function* changeRole(params) {
    yield put({type: IndexActionTypes.FETCH_START})
    try{
        return yield call(reqChangeRole, params._id, params.type)
    }catch(err){
        message.error(err.message)
    }finally{
        yield put({type: IndexActionTypes.FETCH_END})
    }
}

export function* changeRoleFlow() {
    while(true){
        let req = yield take(ManagerUserActionTypes.CHANGE_ROLE)
        let res = yield call(changeRole, req.datas)
        if(res&&res.code===0){
            message.destroy()
            message.success('角色修改成功');
            yield put({type: ManagerUserActionTypes.GET_ALL_USER})
        }else if(res.message === '身份信息已过期，请重新登录'){
            message.destroy()
            message.error(res.message)
            yield delay(500)
            let response = yield call(reqLogout)
            if(response&&response.code === 0){
                yield put({type:IndexActionTypes.RESPONSE_USER_INFO, data: {}})
               location.replace('/')   
            }

        } else{
                message.destroy()
                message.error(res.message)
            }
        
    }
}