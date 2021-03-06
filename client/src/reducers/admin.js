import {combineReducers} from 'redux'
import {reducer as tags} from './adminManagerTags'
import {users} from './adminManagerUser'

export const actionTypes = {
    ADMIN_URI_LOCATION: "ADMIN_URI_LOCATION"
};

const initialState = {
    url: '/'
}

export const actions = {
    change_location_admin: function (url) {
        return {
            type: actionTypes.ADMIN_URI_LOCATION,
            data: url
        }
    }
}

export function reducer(state=initialState, action) {
    switch (action.type){
        case actionTypes.ADMIN_URI_LOCATION:
            return {
                ...state, url: action.data
            };
        default:
            return state
    }
}

const admin = combineReducers({
    tags: tags,
    users: users,
    adminGlobalState: reducer
    
})

export {admin}